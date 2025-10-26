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
}

function step(timestamp) {
  if (!start) start = timestamp;
  if (stop) return;

  crawl.style.top = (parseFloat(getComputedStyle(crawl).top) - speed) + 'px';

  const rect = target.getBoundingClientRect();
  if (rect.top > 0 && rect.bottom < window.innerHeight - 300) {
    invBackBtn.style.display = 'block';
  }

  if (rect.top < -200) {
    stop = true;
    return;
  }

  animationFrame = requestAnimationFrame(step);
}

// Startzustand beim Laden
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

  setTimeout(() => {
    blueLine.style.opacity = 0;
    crawl.style.opacity = 1;

    // Knopf etwas verzögert, aber früh sichtbar
    setTimeout(() => {
      invBackBtn.style.display = 'block';
    }, 2000); // 2 Sekunden nach Beginn des Crawls

    animationFrame = requestAnimationFrame(step);
  }, 4000);
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
  mainContent.classList.add('hidden');
  selectScreen.style.display = 'flex';
});
