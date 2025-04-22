// Last updated: 2025-04-22 11:15 ET

document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');
  const urlInput = document.getElementById('urlInput');
  const lightbox = document.getElementById('lightbox');
  const summarySection = document.getElementById('summarySection');
  const summaryScoreEl = document.getElementById('summaryScore');
  const summarySuperpowers = document.getElementById('summarySuperpowers');
  const summaryOpportunities = document.getElementById('summaryOpportunities');
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const companyInput = document.getElementById('company');

  startBtn.addEventListener('click', async () => {
    const url = urlInput.value.trim();
    if (!/^https?:\/\//i.test(url)) {
      alert('Please enter a valid URL including http:// or https://');
      return;
    }
    lightbox.style.display = 'none';
    summarySection.style.display = 'block';
    try {
      const res = await fetch(
        `https://ai-seo-backend-final.onrender.com/friendly?type=summary&url=${encodeURIComponent(url)}`
      );
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      summaryScoreEl.textContent = data.score;
      summarySuperpowers.innerHTML = '';
      data.ai_superpowers.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${item.title}:</strong><br>${item.explanation}`;
        summarySuperpowers.appendChild(li);
      });
      summaryOpportunities.innerHTML = '';
      data.ai_opportunities.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${item.title}:</strong><br>${item.explanation}`;
        summaryOpportunities.appendChild(li);
      });
      localStorage.setItem('targetURL', url);
      localStorage.setItem('summaryData', JSON.stringify(data));
    } catch (err) {
      console.error(err);
      alert('Failed to load AI SEO summary. Please try again.');
    }
  });

  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const company = companyInput.value.trim();
    if (!name || !email) {
      alert('Name and email are required.');
      return;
    }
    // Save summary + contact info to Firebase
    const summaryData = JSON.parse(localStorage.getItem('summaryData') || '{}');
    await db.collection('reports').add({
      name,
      email,
      company,
      url: localStorage.getItem('targetURL'),
      summary: summaryData,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    // Pass data to full-report page
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('company', company);
    window.location.href = 'full-report.html';
  });
});