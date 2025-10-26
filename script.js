const pwScreen = document.getElementById('password-screen');
const selectScreen = document.getElementById('selection-screen');
const mainContent16 = document.getElementById('mainContent16');
const mainContent20 = document.getElementById('mainContent20');
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
  crawl.classList.remove('crawl-fly');
  blueLine.style.opacity = 0;
  invBackBtn.style.display = 'none';
  themeAudio.pause();
  themeAudio.currentTime = 0;

  const headline = document.getElementById('headline');
  headline.classList.remove('headline-zoom');
  headline.style.opacity = 0;
  headline.style.display = 'block';
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
  mainContent16.classList.add("hidden");
  mainContent20.classList.add("hidden");
  extraContent.classList.add("hidden");
});

pwButton.addEventListener('click', () => {
  const inputVal = document.getElementById('pwInput').value;

  if (inputVal === "123") {
    pwScreen.style.display = 'none';
    mainContent16.classList.remove('hidden');
    selectScreen.style.display = 'flex'; // oder wie du’s möchtest
  } else if (inputVal === "8910") {
    pwScreen.style.display = 'none';
    mainContent20.classList.remove('hidden');
    selectScreen.style.display = 'flex';
  } else {
    alert("Falsches Passwort!");
  }
});

// Du kannst invitationButton handler jeweils für beide Views anpassen
invitationButton.addEventListener('click', () => {
  resetCrawl();
  selectScreen.style.display = 'none';
  
  // Welcher Content gerade aktiv ist?
  let activeMain = mainContent16.classList.contains('hidden') ? mainContent20 : mainContent16;
  activeMain.classList.remove('hidden');

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
      themeAudio.play().catch(err => console.warn("Autoplay blockiert beim echten Start:", err));

      setTimeout(() => {
        headline.style.display = 'none';
        crawl.style.opacity = 1;
        crawl.classList.add('crawl-fly');
        invBackBtn.style.display = 'block';
        animationFrame = requestAnimationFrame(step);
      }, 12000);
    }, 3000);
  }, 5000);
});

infoButton.addEventListener('click', () => {
  selectScreen.style.display = 'none';
  mainContent16.classList.add("hidden");
  mainContent20.classList.add("hidden");
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
  mainContent16.classList.add("hidden");
  mainContent20.classList.add("hidden");
  selectScreen.style.display = 'flex';
});