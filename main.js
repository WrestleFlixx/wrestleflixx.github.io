// ===========================
// WRESTLEFLIX — MAIN JS
// Navigation, Modals, Search
// ===========================

// Scroll row left/right with arrow buttons
function scrollRow(btn, direction) {
  // Find the card-scroll sibling within the wrapper
  const wrapper = btn.closest('.card-scroll-wrapper');
  const row = wrapper.querySelector('.card-scroll');
  const card = row.querySelector('.card');
  const cardWidth = card ? card.offsetWidth + 16 : 200; // card width + gap
  const scrollAmount = cardWidth * 3; // scroll 3 cards at a time
  row.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}


const nav = document.getElementById('site-nav');
const tickerH = 36;
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(8,8,16,0.99)';
  } else {
    nav.style.background = '';
  }
}, { passive: true });

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

document.addEventListener('click', (e) => {
  if (mobileMenu && !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
    mobileMenu.classList.remove('open');
  }
});

// Search
function toggleSearch() {
  const bar = document.getElementById('search-bar');
  bar.classList.toggle('open');
  if (bar.classList.contains('open')) {
    setTimeout(() => document.getElementById('search-input').focus(), 50);
  } else {
    document.getElementById('search-results').classList.remove('visible');
  }
}

function handleSearch(query) {
  const resultsEl = document.getElementById('search-results');
  if (!query || query.length < 2) {
    resultsEl.classList.remove('visible');
    return;
  }

  const q = query.toLowerCase();
  const results = [];

  // Search content
  Object.values(CONTENT).forEach(item => {
    if (item.title.toLowerCase().includes(q) || (item.description || '').toLowerCase().includes(q)) {
      results.push({ type: 'show', id: item.id, title: item.title, sub: item.eyebrow || '' });
    }
    if (item.episodes) {
      item.episodes.forEach(ep => {
        if (ep.title.toLowerCase().includes(q)) {
          results.push({ type: 'episode', id: item.id, title: ep.title, sub: item.title, epId: ep.id });
        }
      });
    }
  });

  // Search federations
  Object.values(FEDERATIONS).forEach(fed => {
    if (fed.name.toLowerCase().includes(q) || fed.description.toLowerCase().includes(q)) {
      results.push({ type: 'federation', id: fed.id, title: fed.name, sub: 'Wrestling Federation' });
    }
    fed.roster.forEach(r => {
      if (r.name.toLowerCase().includes(q)) {
        results.push({ type: 'roster', id: fed.id, title: r.name, sub: `${fed.name} Roster` });
      }
    });
  });

  if (results.length === 0) {
    resultsEl.innerHTML = '<div style="color:var(--text-muted);font-size:14px;padding:1rem;">No results found.</div>';
  } else {
    resultsEl.innerHTML = results.slice(0, 8).map(r => `
      <div class="search-result-item" onclick="handleSearchClick('${r.type}','${r.id}')">
        <div>
          <div class="search-result-title">${r.title}</div>
          <div class="search-result-type">${r.sub}</div>
        </div>
      </div>
    `).join('');
  }

  resultsEl.classList.add('visible');
}

function handleSearchClick(type, id) {
  toggleSearch();
  document.getElementById('search-results').classList.remove('visible');
  if (type === 'federation') {
    openFederation(id);
  } else {
    openContent(id);
  }
}

// ===========================
// CONTENT MODAL
// ===========================

function openContent(id) {
  const item = CONTENT[id];
  if (!item) return;

  document.getElementById('modal-eyebrow').textContent = item.eyebrow || '';
  document.getElementById('modal-title').textContent = item.title;
  document.getElementById('modal-meta').innerHTML = (item.meta || []).join(' <span style="color:var(--text-dim)">·</span> ');

  let bodyHTML = '';

  if (item.type === 'series' && item.episodes) {
    // Show description + episode list
    if (item.description) {
      bodyHTML += `<p style="margin-bottom:2rem;font-family:var(--font-body);font-size:15px;color:var(--text-muted);font-weight:300;">${item.description}</p>`;
    }
    bodyHTML += '<ul class="modal-episode-list">';
    item.episodes.forEach(ep => {
      bodyHTML += `
        <li class="modal-episode-item" onclick="openEpisode('${id}','${ep.id}')">
          <span class="ep-num">${ep.num}</span>
          <span class="ep-title">${ep.title}</span>
          <span class="ep-tag">${ep.tag || ''}</span>
          <span class="ep-play">▶</span>
        </li>
      `;
    });
    bodyHTML += '</ul>';
  } else if (item.type === 'coming-soon') {
    bodyHTML = item.content || '<p>Coming Soon to WrestleFlix.</p>';
  } else if (item.content) {
    bodyHTML = item.content;
  }

  document.getElementById('modal-body').innerHTML = bodyHTML;
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function openEpisode(showId, epId) {
  const show = CONTENT[showId];
  if (!show || !show.episodes) return;
  const ep = show.episodes.find(e => e.id === epId);
  if (!ep) return;

  document.getElementById('modal-eyebrow').textContent = show.title;
  document.getElementById('modal-title').textContent = ep.title;
  document.getElementById('modal-meta').innerHTML = `${ep.num} <span style="color:var(--text-dim)">·</span> ${ep.tag || ''}`;

  let bodyHTML = `<button onclick="openContent('${showId}')" style="background:rgba(255,255,255,0.06);border:1px solid var(--border);color:var(--text-muted);font-family:var(--font-body);font-size:13px;padding:6px 14px;border-radius:4px;cursor:pointer;margin-bottom:2rem;display:inline-flex;align-items:center;gap:6px;">← Back to Episodes</button>`;
  bodyHTML += ep.content || '<p>Coming Soon.</p>';

  document.getElementById('modal-body').innerHTML = bodyHTML;
  document.getElementById('modal-body').scrollTop = 0;
}

function closeModal(event) {
  if (event && event.target !== document.getElementById('modal-overlay')) return;
  _closeModal();
}

function _closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Close button
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    _closeModal();
    closeFedModal();
  }
});

// ===========================
// FEDERATION MODAL
// ===========================

function openFederation(id) {
  const fed = FEDERATIONS[id];
  if (!fed) return;

  let html = `
    <div class="fed-hub">
      <div class="fed-hero">
        <div class="fed-hero-left">
          <h1>${fed.name}</h1>
          <p style="font-family:var(--font-mono);font-size:11px;letter-spacing:2px;color:var(--gold);margin-bottom:0.75rem;text-transform:uppercase;">${fed.tagline}</p>
          <p>${fed.description}</p>
        </div>
        <div class="fed-stats">
          ${fed.stats.map(s => `
            <div class="fed-stat">
              <div class="fed-stat-num">${s.num}</div>
              <div class="fed-stat-label">${s.label}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- SCHEDULE -->
      <div class="fed-section">
        <div class="fed-section-title">Event Schedule</div>
        <div class="schedule-list">
          ${fed.schedule.map(s => `
            <div class="schedule-item">
              <span class="schedule-date">${s.date}</span>
              <span class="schedule-event">${s.event}</span>
              <span class="schedule-type">${s.type}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- RANKINGS -->
      <div class="fed-section">
        <div class="fed-section-title">Current Rankings</div>
        <table class="rankings-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Record</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${fed.rankings.map(r => `
              <tr>
                <td class="rank-num">${r.rank}</td>
                <td>${r.name} ${r.note ? `<span class="rank-champ">${r.note}</span>` : ''}</td>
                <td style="font-family:var(--font-mono);font-size:12px;">${r.record}</td>
                <td></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- TOURNAMENT BRACKET -->
      <div class="fed-section">
        <div class="fed-section-title">Tournament Bracket</div>
        <div class="bracket-placeholder">
          BRACKET UPDATES FOLLOWING EACH FIGHT 2 WIN EVENT<br/>
          <span style="color:var(--gold);margin-top:0.5rem;display:block;">Next Event: ${fed.schedule[0]?.event || 'TBD'}</span>
        </div>
      </div>

      <!-- ROSTER -->
      <div class="fed-section">
        <div class="fed-section-title">Roster</div>
        <div class="roster-grid">
          ${fed.roster.map(r => `
            <div class="roster-card">
              <div class="roster-name">${r.name}</div>
              <div class="roster-role">${r.role}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- APPLICATION -->
      <div class="fed-section">
        <div class="fed-section-title">Apply to Compete</div>
        <form class="apply-form" onsubmit="submitApplication(event,'${id}')">
          <div class="form-group">
            <label>Ring Name</label>
            <input type="text" placeholder="Your ring name" required />
          </div>
          <div class="form-group">
            <label>Real Name</label>
            <input type="text" placeholder="Your real name" required />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" placeholder="your@email.com" required />
          </div>
          <div class="form-group">
            <label>Fighting Style</label>
            <select>
              <option value="">Select style...</option>
              <option>Technical / Submission</option>
              <option>High Flyer / Aerial</option>
              <option>Powerhouse / Brawler</option>
              <option>Hybrid</option>
              <option>Cosmic / Interdimensional</option>
              <option>Robot / Cybernetic</option>
              <option>Mop-Based</option>
            </select>
          </div>
          <div class="form-group full-width">
            <label>Why should you be in ${fed.name}?</label>
            <textarea placeholder="Make your case. Be specific. Be compelling. Francis Ford Cuppola may or may not read this."></textarea>
          </div>
          <div class="form-group full-width">
            <label>Notable Achievements</label>
            <textarea placeholder="Championships, feuds, interdimensional incidents, etc." style="min-height:80px;"></textarea>
          </div>
          <button type="submit" class="btn-submit">Submit Application</button>
        </form>
      </div>
    </div>
  `;

  document.getElementById('fed-modal-content').innerHTML = html;
  document.getElementById('fed-modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function submitApplication(event, fedId) {
  event.preventDefault();
  const form = event.target;
  const btn = form.querySelector('.btn-submit');
  btn.textContent = 'Application Received. Lana Will Be In Touch.';
  btn.style.background = 'var(--gold)';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Submit Application';
    btn.disabled = false;
    btn.style.background = '';
    form.reset();
  }, 4000);
}

function closeFedModal(event) {
  if (event && event.target !== document.getElementById('fed-modal-overlay')) return;
  _closeFedModal();
}

function _closeFedModal() {
  document.getElementById('fed-modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Fade-in cards on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = `opacity 0.4s ease ${i * 0.04}s, transform 0.4s ease ${i * 0.04}s`;
  observer.observe(el);
});
