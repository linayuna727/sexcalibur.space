document.addEventListener('DOMContentLoaded', () => {
  // Language detection and popup logic for about/index.html
  if (window.location.pathname.includes('about/index.html')) {
    const userLang = navigator.language || navigator.userLanguage;
    if (!userLang.startsWith('tr')) { // Show popup if language is NOT Turkish
      const languagePopupOverlay = document.getElementById('languagePopupOverlay');
      if (languagePopupOverlay) {
        languagePopupOverlay.style.display = 'flex';
      }
    }
  }
});

function redirectToEnglish() {
  window.location.href = 'about-en.html';
}

function closeLanguagePopup() {
  const languagePopupOverlay = document.getElementById('languagePopupOverlay');
  if (languagePopupOverlay) {
    languagePopupOverlay.style.display = 'none';
  }
}