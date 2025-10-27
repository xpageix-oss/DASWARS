const pwScreen = document.getElementById('password-screen');
const selectScreen = document.getElementById('selection-screen');
const mainContent = document.getElementById('mainContent');
const extraContent = document.getElementById('extraContent');
const blueLine = document.getElementById('blueLine');
const crawl = document.getElementById('crawl');
const target = document.getElementById('target');
const invBackBtn = document.getElementById('invBackBtn');
const infoBackBtn = document.getElementById('infoBackBtn');
const invitationButton = document.getElementById('invitationButton');
const infoButton = document.getElementById('infoButton');
const pwButton = document.getElementById('pwButton');
const themeAudio = new Audio('assets/theme.mp3');

function resetCrawl() {
  crawl.classList.remove('crawl-fly');
  crawl.style.opacity = 0;
  blueLine.style.opacity = 0;
  invBackBtn.style.display = 'none';
  themeAudio.pause();
  themeAudio.currentTime = 0;

  const headline = document.getElementById('headline');
  headline.classList.remove('headline-zoom');
  headline.style.opacity = 0;
  headline.style.display = 'block';
}

document.addEventListener("DOMContentLoaded", () => {
  pwScreen.style.display = 'flex';
  selectScreen.style.display = 'none';
  mainContent.classList.add("hidden");
  extraContent.classList.add("hidden");
});

pwButton.addEventListener('click', () => {
  const inputVal = document.getElementById('pwInput').value;
  if (inputVal === "2512!") {
    pwScreen.style.display = 'none';
    selectScreen.style.display = 'flex';
  } else {
    alert("Falsches Passwort!");
  }
});

invitationButton.addEventListener('click', () => {
  resetCrawl();
  selectScreen.style.display = 'none';
  extraContent.style.display = 'none';
  mainContent.classList.remove('hidden');

  window.scrollTo(0, 0);
  blueLine.style.opacity = 1;

  themeAudio.load();
  themeAudio.volume = 1;

  setTimeout(() => {
    blueLine.style.opacity = 0;

    setTimeout(() => {
      const headline = document.getElementById('headline');
      headline.style.opacity = 1;
      headline.classList.add('headline-zoom');

      themeAudio.currentTime = 0;
      themeAudio.volume = 1;
      themeAudio.play().catch(err => console.warn("Autoplay blockiert beim echten Start:", err));

      setTimeout(() => {
        headline.style.display = 'none';
        crawl.style.opacity = 1;
        crawl.classList.add('crawl-fly'); // <-- CSS-Animation startet hier
        invBackBtn.style.display = 'block';
      }, 12000);
    }, 3000);
  }, 5000);
});

infoButton.addEventListener('click', () => {
  selectScreen.style.display = 'none';
  mainContent.classList.add('hidden');
  extraContent.style.display = 'block';
  infoBackBtn.style.display = 'block';
  window.scrollTo(0, 0);
});

infoBackBtn.addEventListener('click', () => {
  extraContent.style.display = 'none';
  selectScreen.style.display = 'flex';
});

invBackBtn.addEventListener('click', () => {
  resetCrawl();
  const headline = document.getElementById('headline');
  headline.classList.remove('headline-zoom');
  headline.style.display = 'block';
  mainContent.classList.add('hidden');
  selectScreen.style.display = 'flex';
});