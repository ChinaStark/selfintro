// JSON-driven content and i18n (EN/中文)
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
        authors.textContent = p.authors || '';
        const venue = document.createElement('div');
        venue.className = 'pub-venue';
        venue.textContent = t(p.venue, lang);
        const links = document.createElement('div');
        links.className = 'pub-links';
        const addLink = (label, href) => {
          if (!href) return;
          if (links.childElementCount > 0) {
            const sep = document.createElement('span');
            sep.textContent = '·';
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

    try {
      const resp = await fetch('data/site.json', { cache: 'no-store' });
      SITE = await resp.json();
    } catch (e) {
      console.error('Failed to load data/site.json', e);
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

