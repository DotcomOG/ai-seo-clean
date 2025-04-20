// 🚀 server.js STARTED
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;

// ✅ Allow multiple Vercel frontend URLs
const allowedOrigins = [
  "https://ai-seo-clean.vercel.app",
  "https://ai-seo-clean-lsqpbehnk-yoram-ezras-projects.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

app.use(express.json());

// ✅ Health check
app.get("/", (req, res) => {
  res.send("👋 Hello from AI SEO backend root route!");
});

// ✅ Friendly route (index or full based on ?type=summary|full)
app.get("/friendly", (req, res) => {
  const type = req.query.type || "summary";
  const isFull = type === "full";

  const score = Math.floor(Math.random() * 51) + 50;

  const superpowers = Array.from({ length: isFull ? 10 : 5 }, (_, i) => ({
    title: `AI Superpower ${i + 1}`,
    explanation: Array.from({ length: isFull ? 6 : 3 }, (_, j) => `AI SEO Superpower line ${j + 1} explaining AI compatibility.`).join("\n")
  }));

  const opportunities = Array.from({ length: isFull ? 25 : 10 }, (_, i) => ({
    title: `AI Opportunity ${i + 1}`,
    explanation: Array.from({ length: isFull ? 10 : 4 }, (_, j) => `AI SEO Opportunity line ${j + 1} explaining what's wrong.`).join("\n")
  }));

  const ai_engine_insights = {
    ChatGPT: "Your content hierarchy and semantic clarity are moderately optimized for AI parsing agents.",
    Gemini: "AI-related meta data is sparse and might cause misclassification for generative indexing.",
    Copilot: "Excessive embedded JavaScript could block AI-crawlers from extracting meaning.",
    Jasper: "Structure is clean, but lacks LLM-oriented schema and labels that reinforce content roles."
  };

  res.json({ score, ai_superpowers: superpowers, ai_opportunities: opportunities, ai_engine_insights });
});

// ✅ Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${port}`);
  console.log(`🧠 Loaded version: ai-seo-final-${new Date().toISOString()}`);
});

