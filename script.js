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

let start = null;
let stop = false;
const speed = 0.35;
let animationFrame;

function resetCrawl() {
  cancelAnimationFrame(animationFrame);
  start = null;
  stop = false;
  crawl.style.top = '90%';
  crawl.style.opacity = 0;
  blueLine.style.opacity = 0;
  invBackBtn.style.display = 'none';
  themeAudio.pause();
  themeAudio.currentTime = 0;

  const headline = document.getElementById('headline');
  headline.classList.remove('headline-zoom');
  headline.style.opacity = 0;
  headline.style.display = 'block'; // sichtbar vorbereiten
}

function step(timestamp) {
  if (!start) start = timestamp;
  if (stop) return;

  crawl.style.top = (parseFloat(getComputedStyle(crawl).top) - speed) + 'px';

  const rect = target.getBoundingClientRect();
  if (rect.top < -200) {
    stop = true;
    return;
  }

  animationFrame = requestAnimationFrame(step);
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

  // ✅ Autoplay-Bypass: Musik anspielen ohne Lautstärke (Browser lässt es dann durchgehen)
  themeAudio.currentTime = 0;
  themeAudio.volume = 0.001; // Minimale Lautstärke reicht oft besser als 0
  themeAudio.play().catch(err => console.warn("Autoplay blockiert", err));

  // Blaue Zeile sichtbar, dann Fading
  setTimeout(() => {
    blueLine.style.opacity = 0;

    // Headline nach BlueLine-Fade + 1s Pause
    setTimeout(() => {
      const headline = document.getElementById('headline');
      headline.style.opacity = 1;
      headline.classList.add('headline-zoom');

      // ✅ Jetzt Lautstärke hoch
      themeAudio.volume = 1;

      setTimeout(() => {
        headline.style.display = 'none';
        crawl.style.opacity = 1;

        invBackBtn.style.display = 'block';
        animationFrame = requestAnimationFrame(step);
      }, 6000); // Headline dauert 6s
    }, 1000); // ⬅️ Delay NACH Fade
  }, 5000); // ⬅️ BlueLine steht 5 Sekunden
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