const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// OpenAI config
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Health check route
app.get('/', (req, res) => {
  res.send('🎯 AI SEO Server is live!');
});

// Main endpoint
app.get('/friendly', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  try {
    const response = await fetch(url);
    const html = await response.text();

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

    const aiResponse = await openai.createChatCompletion({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const output = aiResponse.data.choices[0].message.content;
    console.log('🔍 RAW OpenAI Output:\n', output);

    const lines = output.split('\n');
    console.log('\n📦 Line-by-line breakdown:');
    lines.forEach((line, i) => console.log(`${i + 1}: ${line}`));

    res.json({ lines });
  } catch (err) {
    console.error('❌ OpenAI API error:', err);
    res.status(500).json({ error: 'OpenAI call failed', details: err.message });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});