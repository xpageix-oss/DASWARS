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
const gifScreen = document.getElementById('gif-screen');
const pascalImage = document.getElementById('pascalImage');

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
  headline.style.display = 'block';

  // Bild verstecken
  pascalImage.classList.remove("visible");
  pascalImage.classList.add("hidden");
}

function step(timestamp) {
  if (!start) start = timestamp;
  if (stop) return;

  crawl.style.top = (parseFloat(getComputedStyle(crawl).top) - speed) + 'px';

  const rect = target.getBoundingClientRect();
  if (rect.top < -window.innerHeight) {
    stop = true;

    // Bild erst am Ende zeigen
    pascalImage.classList.remove("hidden");
    pascalImage.classList.add("visible");

    return;
  }

  animationFrame = requestAnimationFrame(step);
}

document.addEventListener("DOMContentLoaded", () => {
  pwScreen.style.display = 'flex';
  selectScreen.style.display = 'none';
  mainContent.classList.add("hidden");
  extraContent.classList.add("hidden");
  pascalImage.classList.add("hidden"); // Anfangszustand für das Bild
});

pwButton.addEventListener('click', () => {
  const inputVal = document.getElementById('pwInput').value;

  if (inputVal === "pagei30") {
    gifScreen.classList.remove('hidden');
    pwScreen.style.display = 'none';

    setTimeout(() => {
      gifScreen.classList.add('hidden');
      selectScreen.style.display = 'flex';
    }, 2000);
  } else {
    alert("Falsches Passwort!");
  }
});

invitationButton.addEventListener('click', () => {
  gifScreen.classList.add('hidden');
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
      themeAudio.play().catch(err => console.warn("Autoplay blockiert:", err));

      setTimeout(() => {
        headline.style.display = 'none';
        crawl.style.opacity = 1;

        invBackBtn.style.display = 'block';
        animationFrame = requestAnimationFrame(step);

        // Fallback: Bild nach 90 Sekunden einblenden (wenn Scrollen scheitert)
        setTimeout(() => {
          if (pascalImage.classList.contains("hidden")) {
            pascalImage.classList.remove("hidden");
            pascalImage.classList.add("visible");
          }
        }, 1000);

      }, 12000);
    }, 3000);
  }, 5000);
});

infoButton.addEventListener('click', () => {
  selectScreen.style.display = 'none';
  mainContent.classList.add('hidden');
  extraContent.style.display = 'block';
  extraContent.classList.add('show');
  infoBackBtn.style.display = 'block';
  window.scrollTo(0, 0);
});

infoBackBtn.addEventListener('click', () => {
  extraContent.style.display = 'none';
  extraContent.classList.remove('show');
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