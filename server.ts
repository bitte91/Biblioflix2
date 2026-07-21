import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { GoogleGenAI, GenerateVideosOperation } from '@google/genai';

dotenv.config();

const dirName = typeof __dirname !== 'undefined' ? __dirname : process.cwd();

const app = express();
app.use(express.json({ limit: '20mb' }));

const PORT = 3000;

// Helper to get Gemini client
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not configured.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 1. Text & AI Assistant Endpoint (Biblioflix AI)
app.post('/api/ai/ask', async (req, res) => {
  try {
    const { prompt, systemInstruction, mode, selectedText } = req.body;
    const ai = getGenAI();

    let finalPrompt = prompt;
    let enableSearch = false;

    if (mode === 'youtube') {
      enableSearch = true;
      finalPrompt = `Pesquise no YouTube e na web por vídeos, documentários, pregações, audiolivros ou resumos em vídeo relacionados ao seguinte trecho/assunto:\n\n"${selectedText || prompt}"\n\nForneça uma recomendação organizada com títulos de vídeos relevantes, canais sugeridos, o que é abordado e os links/fontes encontrados.`;
    } else if (mode === 'products') {
      enableSearch = true;
      finalPrompt = `Identifique e busque produtos físicos ou digitais descritos ou relacionados a este trecho/cena para compra online (ex: edições de Bíblias de estudo, cadernos devocionais, objetos de época, livros de referência, fones de ouvido, itens de decoração ou vestuário mencionados):\n\n"${selectedText || prompt}"\n\nListe quais produtos estão disponíveis para venda, preços médios estimados e sugestões de onde encontrar com os links das pesquisas.`;
    } else if (mode === 'summarize') {
      finalPrompt = `Forneça um resumo claro, profundo e inspirador do seguinte trecho em português:\n\n"${selectedText}"\n\nPrompt adicional: ${prompt || 'Resuma os principais pontos.'}`;
    } else if (mode === 'cite') {
      finalPrompt = `Gere uma citação acadêmica e devocional formatada (ABNT e citação livre) do trecho:\n\n"${selectedText}"`;
    } else if (mode === 'translate') {
      finalPrompt = `Traduza com precisão para o português (ou do português para o inglês se já estiver em português) preservando o tom literário e elegante do trecho:\n\n"${selectedText}"`;
    } else if (mode === 'quiz') {
      finalPrompt = `Com base no seguinte texto, crie um questionário interativo de 3 perguntas para reflexão e teste de conhecimento com alternativas e gabarito comentado:\n\n"${selectedText || prompt}"`;
    }

    const config: any = {
      systemInstruction: systemInstruction || 'Você é o Biblioflix AI, um assistente inteligente especializado em literatura, teologia, estudo bíblico e curadoria de mídias e produtos. Responda em português com clareza, elegância e utilidade.',
    };

    if (enableSearch) {
      config.tools = [{ googleSearch: {} }];
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: finalPrompt,
      config,
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const searchLinks = groundingChunks
      .filter((chunk: any) => chunk.web?.uri)
      .map((chunk: any) => ({
        title: chunk.web.title || 'Resultado da Busca',
        uri: chunk.web.uri,
      }));

    res.json({
      text: response.text,
      sources: searchLinks,
    });
  } catch (error: any) {
    console.error('API Error /api/ai/ask:', error);
    res.status(500).json({ error: error.message || 'Erro ao processar requisição da IA.' });
  }
});

// 2. High Quality Image Generation Endpoint using gemini-3-pro-image-preview
app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt, aspectRatio = '1:1', imageSize = '1K' } = req.body;
    const ai = getGenAI();

    // Model specified by requirements: gemini-3-pro-image-preview
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
          imageSize: imageSize, // 1K, 2K, or 4K
        },
      },
    });

    let imageUrl = '';
    const parts = response.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData?.data) {
        const mime = part.inlineData.mimeType || 'image/png';
        imageUrl = `data:${mime};base64,${part.inlineData.data}`;
        break;
      }
    }

    if (!imageUrl) {
      return res.status(500).json({ error: 'Nenhuma imagem foi gerada pelo modelo.' });
    }

    res.json({ imageUrl });
  } catch (error: any) {
    console.error('API Error /api/generate-image:', error);
    res.status(500).json({ error: error.message || 'Erro ao gerar imagem com Gemini Pro.' });
  }
});

// 3. Video Generation Endpoints using veo-3.1-fast-generate-preview
app.post('/api/generate-video', async (req, res) => {
  try {
    const { prompt, imageBytes, mimeType = 'image/png', aspectRatio = '16:9' } = req.body;
    const ai = getGenAI();

    const videoConfig: any = {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: aspectRatio, // 16:9 or 9:16
    };

    const requestPayload: any = {
      model: 'veo-3.1-fast-generate-preview',
      config: videoConfig,
    };

    if (prompt) {
      requestPayload.prompt = prompt;
    }

    if (imageBytes) {
      requestPayload.image = {
        imageBytes: imageBytes,
        mimeType: mimeType,
      };
    }

    const operation = await ai.models.generateVideos(requestPayload);
    res.json({ operationName: operation.name });
  } catch (error: any) {
    console.error('API Error /api/generate-video:', error);
    res.status(500).json({ error: error.message || 'Erro ao iniciar geração de vídeo Veo.' });
  }
});

app.post('/api/video-status', async (req, res) => {
  try {
    const { operationName } = req.body;
    const ai = getGenAI();

    const op = new GenerateVideosOperation();
    op.name = operationName;

    const updated = await ai.operations.getVideosOperation({ operation: op });
    res.json({ done: updated.done, response: updated.response });
  } catch (error: any) {
    console.error('API Error /api/video-status:', error);
    res.status(500).json({ error: error.message || 'Erro ao verificar status do vídeo.' });
  }
});

app.post('/api/video-download', async (req, res) => {
  try {
    const { operationName } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is required.');
    }
    const ai = getGenAI();

    const op = new GenerateVideosOperation();
    op.name = operationName;

    const updated = await ai.operations.getVideosOperation({ operation: op });
    const uri = updated.response?.generatedVideos?.[0]?.video?.uri;

    if (!uri) {
      return res.status(404).json({ error: 'URL do vídeo não encontrada.' });
    }

    const videoRes = await fetch(uri, {
      headers: { 'x-goog-api-key': apiKey },
    });

    if (!videoRes.ok) {
      throw new Error(`Falha ao baixar vídeo: ${videoRes.statusText}`);
    }

    res.setHeader('Content-Type', 'video/mp4');
    const arrayBuffer = await videoRes.arrayBuffer();
    res.send(Buffer.from(arrayBuffer));
  } catch (error: any) {
    console.error('API Error /api/video-download:', error);
    res.status(500).json({ error: error.message || 'Erro ao realizar download do vídeo.' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(dirName, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(dirName, 'dist', 'index.html'));
    });
  } else {
    // Lazy load vite server middleware for development
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BIBLIOFLIX Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
