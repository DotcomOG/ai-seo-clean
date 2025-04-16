const express = require('express');
const cors = require('cors');
const axios = require('axios');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
  origin: 'https://ai-seo-clean.vercel.app'
}));

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get('/', (req, res) => {
  res.send('🎯 AI SEO Server is live!');
});

app.get('/friendly', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  try {
    const response = await axios.get(url);
    const html = response.data;

    const prompt = `Analyze this webpage for AI SEO friendliness:\n\n${html}\n\nReturn JSON in this format:\n{
      "score": 0-100,
      "ai_superpowers": [{"title": "...", "explanation": "..."}],
      "ai_opportunities": [{"title": "...", "explanation": "..."}],
      "ai_engine_insights": {
        "ChatGPT": "...",
        "Claude": "...",
        "Google Gemini": "...",
        "Microsoft Copilot": "...",
        "Jasper AI": "..."
      }
    }`;

    const aiResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const output = aiResponse.choices[0].message.content;
    const lines = output.split('\n');
    res.json({ lines });
  } catch (err) {
    console.error('❌ Error in /friendly:', err);
    res.status(500).json({ error: 'Failed to process AI SEO analysis', details: err.message });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});