document.addEventListener("DOMContentLoaded", async () => {
  const name = localStorage.getItem("name") || "";
  const email = localStorage.getItem("email") || "";
  const company = localStorage.getItem("company") || "";
  const url = prompt("Confirm the website URL to load full analysis:", "https://example.com");

  if (!url || !/^https?:\/\/.+/i.test(url)) {
    alert("Invalid or missing URL. Please refresh and try again.");
    return;
  }

  try {
    const res = await fetch(`https://ai-seo-backend-live-production.up.railway.app/friendly?type=full&url=${encodeURIComponent(url)}`);
    const data = await res.json();

    document.getElementById("score").textContent = `${data.score}/100`;

    const superpowersList = document.getElementById("superpowersList");
    data.ai_superpowers.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.title}:\n${item.explanation}`;
      superpowersList.appendChild(li);
    });

    const opportunitiesList = document.getElementById("opportunitiesList");
    data.ai_opportunities.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.title}:\n${item.explanation}`;
      opportunitiesList.appendChild(li);
    });

    const engineInsightsList = document.getElementById("engineInsightsList");
    for (const [engine, insight] of Object.entries(data.ai_engine_insights)) {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${engine}:</strong> ${insight}`;
      engineInsightsList.appendChild(li);
    }
  } catch (err) {
    console.error("❌ Error loading full report:", err);
    alert("Something went wrong. Please try again or check the backend.");
  }

  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("company").value = company;

  document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("contactStatus").textContent =
      "✅ Thank you for your interest. We will contact you for a full analysis.";
  });
});
