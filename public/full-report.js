// Last updated: 2025-04-22 11:17 ET

document.addEventListener('DOMContentLoaded', async () => {
  const nameVal = localStorage.getItem('name') || '';
  const emailVal = localStorage.getItem('email') || '';
  const companyVal = localStorage.getItem('company') || '';
  const url = localStorage.getItem('targetURL');

  document.getElementById('targetUrl').textContent = url;
  document.getElementById('name').value = nameVal;
  document.getElementById('email').value = emailVal;
  document.getElementById('company').value = companyVal;

  try {
    const res = await fetch(
      `https://ai-seo-backend-final.onrender.com/friendly?type=full&url=${encodeURIComponent(url)}`
    );
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();

    document.getElementById('score').textContent = data.score;
    const spList = document.getElementById('superpowersList');
    spList.innerHTML = '';
    data.ai_superpowers.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${item.title}:</strong><br>${item.explanation}`;
      spList.appendChild(li);
    });

    const oppList = document.getElementById('opportunitiesList');
    oppList.innerHTML = '';
    data.ai_opportunities.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${item.title}:</strong><br>${item.explanation}`;
      oppList.appendChild(li);
    });

    const insightsList = document.getElementById('engineInsightsList');
    insightsList.innerHTML = '';
    Object.entries(data.ai_engine_insights).forEach(([eng, txt]) => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${eng}:</strong> ${txt}`;
      insightsList.appendChild(li);
    });

    localStorage.setItem('fullData', JSON.stringify(data));
  } catch (err) {
    console.error(err);
    alert('Failed to load detailed report.');
  }

  document.getElementById('contactForm').addEventListener('submit', async e => {
    e.preventDefault();
    await db.collection('reports').add({
      name: nameVal,
      email: emailVal,
      company: companyVal,
      url,
      fullReport: JSON.parse(localStorage.getItem('fullData') || '{}'),
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    document.getElementById('contactStatus').textContent =
      '✅ Detailed report request received!';
  });
});