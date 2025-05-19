// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Helper: inject a piece of HTML into <div id="{part}-placeholder">
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
  
    // 1️⃣ Load header → 2️⃣ then nav → 3️⃣ then footer
    loadPart('header')
      .then(() => loadPart('nav'))
      .then(() => loadPart('footer'))
      .then(() => {
        // 🔄 Now that footer (and the translate button) is in the DOM:
        const toggleButton = document.getElementById('translate-btn');
        let isEnglish = false;
  
        function applyTranslation() {
          document.querySelectorAll('[data-en]').forEach(el => {
            el.textContent = isEnglish
              ? el.getAttribute('data-en')
              : el.getAttribute('data-he');
          });
          toggleButton.textContent = isEnglish
            ? toggleButton.getAttribute('data-he')
            : toggleButton.getAttribute('data-en');
        }
  
        // Wire up click
        toggleButton.addEventListener('click', () => {
          isEnglish = !isEnglish;
          applyTranslation();
        });
  
        // Flip into English immediately on load
        isEnglish = true;
        applyTranslation();
      })
      .catch(err => console.error(err));
  });
  