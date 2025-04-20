document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("seoForm");
  const loading = document.getElementById("loading");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const company = document.getElementById("company").value.trim();

    if (!name || !email) {
      alert("Name and Email are required.");
      return;
    }

    const url = prompt("Enter the website URL to analyze:", "https://example.com");
    if (!url || !/^https?:\/\/.+/i.test(url)) {
      alert("Please enter a valid URL (starting with http or https).");
      return;
    }

    loading.classList.remove("hidden");
    console.log("📡 Sending request to backend...");

    try {
      const res = await fetch(`https://ai-seo-backend-live-production.up.railway.app/friendly?type=summary&url=${encodeURIComponent(url)}`);
      console.log("✅ Response received:", res);

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      console.log("📦 Parsed response:", data);

      localStorage.setItem("score", data.score);
      localStorage.setItem("superpowers", JSON.stringify(data.ai_superpowers));
      localStorage.setItem("opportunities", JSON.stringify(data.ai_opportunities));
      localStorage.setItem("engineInsights", JSON.stringify(data.ai_engine_insights));
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("company", company);

      window.location.href = "/full-report.html";
    } catch (err) {
      loading.classList.add("hidden");
      console.error("❌ Error during fetch:", err);
      alert("Something went wrong while fetching the SEO analysis. Please check the console for details.");
    }
  });
});
