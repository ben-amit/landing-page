// script.js

document.addEventListener('DOMContentLoaded', () => {
  function loadPart(part) {
    const placeholder = document.getElementById(`${part}-placeholder`);
    if (!placeholder) return Promise.resolve();
    return fetch(`${part}.html`)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load ${part}.html`);
        return res.text();
      })
      .then(html => {
        placeholder.innerHTML = html;
      });
  }

  loadPart('header')
    .then(() => loadPart('nav'))
    .then(() => loadPart('footer'))
    .then(() => {
      const toggleButton = document.getElementById('translate-btn');
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');

      if (urlLang === 'he' || urlLang === 'en') {
        localStorage.setItem('lang', urlLang);
      }

      let lang = localStorage.getItem('lang') || 'en';

      function applyTranslation() {
        document.querySelectorAll('[data-en]').forEach(el => {
          el.textContent = (lang === 'en')
            ? el.getAttribute('data-en')
            : el.getAttribute('data-he');
        });
        toggleButton.textContent = (lang === 'en')
          ? toggleButton.getAttribute('data-he')
          : toggleButton.getAttribute('data-en');
      }

      function updateNavLinks() {
        document.querySelectorAll('nav a[href]').forEach(a => {
          const url = new URL(a.href, window.location.origin);
          url.searchParams.set('lang', lang);
          a.href = url.toString();
        });
      }

      toggleButton.addEventListener('click', () => {
        lang = (lang === 'en' ? 'he' : 'en');
        localStorage.setItem('lang', lang);

        const base = window.location.pathname;
        history.replaceState(null, '', `${base}?lang=${lang}`);

        applyTranslation();
        updateNavLinks();
      });

      applyTranslation();
      updateNavLinks();
    })
    .catch(err => console.error(err));
});
