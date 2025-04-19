const form = document.getElementById("seoForm");
const scoreEl = document.getElementById("score");
const superpowersList = document.getElementById("superpowersList");
const opportunitiesList = document.getElementById("opportunitiesList");
const engineInsightsList = document.getElementById("engineInsightsList");
const loading = document.getElementById("loading");
const resultsContainer = document.getElementById("resultsContainer");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const url = document.getElementById("urlInput").value.trim();
  if (!url) return;

  resultsContainer.classList.add("hidden");
  loading.classList.remove("hidden");

  try {
    const res = await fetch(`https://ai-seo-backend-live-production.up.railway.app/friendly?url=${encodeURIComponent(url)}`);
    const data = await res.json();

    scoreEl.textContent = `${data.score}/100`;

    superpowersList.innerHTML = "";
    data.ai_superpowers.slice(0, 5).forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.title}: ${item.explanation}`;
      superpowersList.appendChild(li);
    });

    opportunitiesList.innerHTML = "";
    data.ai_opportunities.slice(0, 10).forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.title}: ${item.explanation}`;
      opportunitiesList.appendChild(li);
    });

    engineInsightsList.innerHTML = "";
    for (const [engine, insight] of Object.entries(data.ai_engine_insights)) {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${engine}:</strong> ${insight}`;
      engineInsightsList.appendChild(li);
    }

    loading.classList.add("hidden");
    resultsContainer.classList.remove("hidden");
  } catch (err) {
    loading.textContent = "Error running analysis. Please try again.";
    console.error(err);
  }
});
