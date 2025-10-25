document.getElementById("pwButton").addEventListener("click", checkPassword);
document.getElementById("invitationButton").addEventListener("click", startInvitation);
document.getElementById("infoButton").addEventListener("click", startInfo);
document.getElementById("invBackBtn").addEventListener("click", goBack);
document.getElementById("infoBackBtn").addEventListener("click", goBack);

function checkPassword() {
  const inputVal = document.getElementById("pwInput").value;
  if (inputVal === "2512!") {
    document.getElementById("password-screen").classList.add("hidden");
    document.getElementById("selection-screen").classList.remove("hidden");
  } else {
    alert("Falsches Passwort!");
  }
}

function startInvitation() {
  document.getElementById("selection-screen").classList.add("hidden");
  document.getElementById("extraContent").classList.add("hidden");
  document.getElementById("mainContent").classList.remove("hidden");

  window.scrollTo(0,0);
  document.getElementById("blueLine").style.opacity = 1;

  setTimeout(() => {
    document.getElementById("blueLine").style.opacity = 0;
    document.getElementById("crawl").style.opacity = 1;
  }, 4000);
}

function startInfo() {
  document.getElementById("selection-screen").classList.add("hidden");
  document.getElementById("mainContent").classList.add("hidden");
  document.getElementById("extraContent").classList.remove("hidden");
  window.scrollTo(0,0);
}

function goBack() {
  document.getElementById("mainContent").classList.add("hidden");
  document.getElementById("extraContent").classList.add("hidden");
  document.getElementById("selection-screen").classList.remove("hidden");
}