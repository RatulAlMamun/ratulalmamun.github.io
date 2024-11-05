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

async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    displayData(data);
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

window.onload = fetchData;




/* <div class="singleBlog">
          <div class="blogTimeline">
            <p>Apr 2 2024</p>
            <p class="small">3 min read</p>
          </div>
          <div class="blogDetails">
            <a href="" target="_blank">
              <p class="blogTitle">Unleash Your Dev Blog: Write More with GitHub Issues as Your CMS</p>
              <p class="blogInfo">Published: 5 October 2024 | Comment: 1 | Reaction: 5</p>
              <p class="blogLink">Learn more →</p>
            </a>
          </div>
        </div> */
