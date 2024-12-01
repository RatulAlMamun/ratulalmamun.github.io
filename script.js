document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// API URL
const apiUrl = 'https://dev.to/api/articles?username=ratulalmamun';
const vistCountWorkerUrl = 'https://protfolio-worker.ratulalmamun23.workers.dev';

async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    displayData(data);
    updateVisitorStats();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayData(data) {
  const container = document.getElementById('data-container');
  data.forEach(item => {
    const singleBlog = document.createElement('div');
    singleBlog.className = 'singleBlog';
    singleBlog.innerHTML = `
      <div class="blogTimeline">
        <p>${new Date(item.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
        <p class="small">${item.reading_time_minutes} min read</p>
      </div>
      <div class="blogDetails">
        <a href="${item.url}" target="_blank">
          <p class="blogTitle">${item.title}</p>
          <p class="blogInfo">Edited: ${new Date(item.edited_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} | Comment: ${item.comments_count} | Reaction: ${item.public_reactions_count}</p>
          <p class="blogLink">Learn more →</p>
        </a>
      </div>
    `;
    container.appendChild(singleBlog);
  });
}

async function updateVisitorStats() {
  try {
    const response = await fetch(vistCountWorkerUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    document.getElementById("total-visits").textContent = data.visitCount || 0;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

window.onload = fetchData;
