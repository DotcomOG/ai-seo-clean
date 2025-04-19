// 🚀 server.js STARTED
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;

// ✅ Allow all origins during development (change in production)
app.use(cors());

app.use(express.json());

// ✅ Root route (for health check)
app.get("/", (req, res) => {
  res.send("👋 Hello from AI SEO backend root route!");
});

// ✅ The /friendly route
app.get("/friendly", async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: "URL is required" });

    // Generate a dynamic score between 50 and 100
    const dynamicScore = Math.floor(Math.random() * 51) + 50;

    // Construct a full simulated response
    const response = {
      score: dynamicScore,
      ai_superpowers: [
        { title: "Meta Tags", explanation: "Well-formed OG tags." },
        { title: "Mobile Optimization", explanation: "Responsive meta present." },
        { title: "Title Tag", explanation: "Descriptive title provided." },
        { title: "HTTPS", explanation: "Secure connection is active." },
        { title: "Canonical Tag", explanation: "Canonical URL is specified." }
      ],
      ai_opportunities: [
        { title: "Alt Text", explanation: "Some images lack alt attributes." },
        { title: "Page Speed", explanation: "Unminified scripts detected." },
        { title: "Broken Links", explanation: "Some links are broken or outdated." },
        { title: "No Schema", explanation: "Structured data is missing." },
        { title: "Missing H1", explanation: "Page lacks a top-level heading." },
        { title: "Meta Description", explanation: "Meta descriptions are missing or duplicated." },
        { title: "Mobile Tap Targets", explanation: "Touch targets are too close." },
        { title: "No Sitemap.xml", explanation: "XML sitemap is not found." },
        { title: "Robots.txt", explanation: "Robots.txt file is missing or misconfigured." },
        { title: "Low Word Count", explanation: "Content is too thin." }
      ],
      ai_engine_insights: {
        ChatGPT: "Good structure, but minor accessibility issues.",
        Gemini: "Great metadata, but large JS payload.",
        Copilot: "Efficient layout, weak keyword targeting.",
        Jasper: "Strong CTAs, excellent meta usage."
      }
    };

    return res.json(response);
  } catch (err) {
    console.error("❌ Error in /friendly route:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${port}`);
  console.log(`🧠 Loaded version: ai-seo-final-${new Date().toISOString()}`);
});
