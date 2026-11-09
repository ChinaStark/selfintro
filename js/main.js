// JSON-driven content and i18n (EN/涓枃)
(function () {
  let SITE = null; // { i18n: { en, zh }, content: { ... } }

  function getStrings(lang) {
    if (!SITE || !SITE.i18n) return {};
    return SITE.i18n[lang] || SITE.i18n.en || {};
  }

  function t(obj, lang) {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    if (typeof obj === 'object' && (obj.en || obj.zh)) {
      return obj[lang] || obj.en || '';
    }
    return '';
  }

  function escapeHtml(text) {
    return String(text)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function renderAuthors(authors, highlightAuthor) {
    const safeAuthors = escapeHtml(authors || '');
    if (!highlightAuthor) return safeAuthors;
    const safeHighlight = escapeHtml(highlightAuthor);
    return safeAuthors.replaceAll(safeHighlight, `<strong>${safeHighlight}</strong>`);
  }

  function renderContent(lang) {
    if (!SITE || !SITE.content) return;
    const content = SITE.content;

    // Interests
    const interestsEl = document.getElementById('interests-list');
    if (interestsEl && Array.isArray(content.interests)) {
      interestsEl.innerHTML = '';
      content.interests.forEach(item => {
        const li = document.createElement('li');
        li.textContent = t(item, lang);
        interestsEl.appendChild(li);
      });
    }

    // News
    const newsEl = document.getElementById('news-list');
    if (newsEl && Array.isArray(content.news)) {
      newsEl.innerHTML = '';
      content.news.forEach(n => {
        const li = document.createElement('li');
        const date = document.createElement('span');
        date.className = 'date';
        date.textContent = n.date || '';
        li.appendChild(date);
        li.append(' ' + t(n, lang));
        newsEl.appendChild(li);
      });
    }

    // Internships
    const internshipsEl = document.getElementById('internships-list');
    if (internshipsEl && Array.isArray(content.internships)) {
      internshipsEl.replaceChildren();
      content.internships.forEach(internship => {
        const card = document.createElement('li');
        card.className = 'card';
        const company = document.createElement('h3');
        company.textContent = t(internship.company, lang);
        const period = document.createElement('p');
        period.textContent = t(internship.period, lang);
        const role = document.createElement('strong');
        role.textContent = t(internship.role, lang);
        const desc = document.createElement('p');
        desc.textContent = t(internship.desc, lang);
        card.append(company, period, role, desc);
        internshipsEl.appendChild(card);
      });
    }

    // Awards
    const awardsEl = document.getElementById('awards-list');
    if (awardsEl && Array.isArray(content.awards)) {
      awardsEl.innerHTML = '';
      content.awards.forEach(a => {
        const li = document.createElement('li');
        const title = document.createElement('div');
        title.className = 'award-title';
        title.textContent = t(a.title, lang);
        const desc = document.createElement('div');
        desc.className = 'award-desc';
        desc.textContent = t(a.desc, lang);
        li.appendChild(title);
        li.appendChild(desc);
        awardsEl.appendChild(li);
      });
    }

    // Publications
    const pubsEl = document.getElementById('pubs-list');
    if (pubsEl && Array.isArray(content.publications)) {
      pubsEl.innerHTML = '';
      content.publications.forEach(p => {
        const li = document.createElement('li');
        const title = document.createElement('div');
        title.className = 'pub-title';
        title.textContent = t(p.title, lang);
        const authors = document.createElement('div');
        authors.className = 'pub-authors';
        authors.innerHTML = renderAuthors(p.authors, p.highlightAuthor);
        const venue = document.createElement('div');
        venue.className = 'pub-venue';
        venue.textContent = t(p.venue, lang);
        const links = document.createElement('div');
        links.className = 'pub-links';
        const addLink = (label, href) => {
          if (!href) return;
          if (links.childElementCount > 0) {
            const sep = document.createElement('span');
            sep.textContent = ' | ';
            links.appendChild(sep);
          }
          const a = document.createElement('a');
          a.href = href;
          a.target = '_blank';
          a.rel = 'noopener';
          a.textContent = label;
          links.appendChild(a);
        };
        const plinks = p.links || {};
        addLink('PDF', plinks.pdf);
        addLink('DOI', plinks.doi);
        addLink('Code', plinks.code);

        li.appendChild(title);
        li.appendChild(authors);
        li.appendChild(venue);
        li.appendChild(links);
        pubsEl.appendChild(li);
      });
    }

    // Projects
    const projectsEl = document.getElementById('projects-list');
    if (projectsEl && Array.isArray(content.projects)) {
      projectsEl.innerHTML = '';
      content.projects.forEach(pr => {
        const li = document.createElement('li');
        const card = document.createElement('div');
        card.className = 'card';
        const h3 = document.createElement('h3');
        h3.textContent = pr.name || '';
        const p = document.createElement('p');
        p.textContent = t(pr.desc, lang);
        const links = document.createElement('p');
        links.className = 'card-links';
        if (pr.link) {
          const a = document.createElement('a');
          a.href = pr.link;
          a.target = '_blank';
          a.rel = 'noopener';
          a.textContent = 'Code';
          links.appendChild(a);
        }
        card.appendChild(h3);
        card.appendChild(p);
        card.appendChild(links);
        li.appendChild(card);
        projectsEl.appendChild(li);
      });
    }
  }

  function applyLang(lang) {
    const strings = getStrings(lang);
    document.documentElement.lang = lang;
    if (strings['page.title']) document.title = strings['page.title'];
    const allowHTML = new Set(['about.body']);
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const txt = strings[key];
      if (typeof txt === 'string') {
        if (allowHTML.has(key)) {
          el.innerHTML = txt;
        } else {
          el.textContent = txt;
        }
      }
    });
    const btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = lang === 'en' ? 'CN' : 'EN';
    try { localStorage.setItem('lang', lang); } catch {}

    // Render dynamic sections from JSON
    renderContent(lang);

    // Ensure avatar shows with robust fallbacks
    setupAvatar();
  }

  async function init() {
    let lang = 'en';
    try {
      lang = localStorage.getItem('lang') || lang;
    } catch {}
    if (!localStorage.getItem('lang')) {
      if (navigator.language && navigator.language.toLowerCase().startsWith('zh')) {
        lang = 'zh';
      }
    }

    // Pure static: prefer global window.SITE object, else parse inline JSON
    if (window.SITE && typeof window.SITE === 'object') {
      SITE = window.SITE;
    } else {
      const inlineEl = document.getElementById('site-data');
      if (inlineEl && inlineEl.textContent && inlineEl.textContent.trim().length > 0) {
        try {
          SITE = JSON.parse(inlineEl.textContent);
        } catch (e) {
          console.warn('Inline site-data JSON parse failed:', e);
        }
      }
    }
    if (!SITE) {
      SITE = { i18n: { en: {} }, content: {} };
    }

    applyLang(lang);
    const btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.addEventListener('click', () => {
        lang = (document.documentElement.lang === 'zh') ? 'en' : 'zh';
        applyLang(lang);
      });
    }
  }

  function setupAvatar() {
    const el = document.querySelector('img.avatar');
    if (!el || el.dataset.avatarSetup === '1') return;
    el.dataset.avatarSetup = '1';
    const localSrc = 'assets/profile.jpg';
    const remoteSrc = 'https://avatars.githubusercontent.com/u/96754989?v=4';
    const placeholder = 'data:image/svg+xml;utf8,' +
      encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256'><rect width='100%' height='100%' fill='#e5e7eb'/><circle cx='128' cy='96' r='64' fill='#cbd5e1'/><rect x='56' y='176' width='144' height='32' rx='16' fill='#cbd5e1'/></svg>");

    function tryLoad(src, onFail) {
      const img = new Image();
      img.onload = () => { el.src = src; };
      img.onerror = () => { if (typeof onFail === 'function') onFail(); else el.src = placeholder; };
      img.src = src;
    }

    // Try local → remote → placeholder
    tryLoad(localSrc, () => tryLoad(remoteSrc, () => { el.src = placeholder; }));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

