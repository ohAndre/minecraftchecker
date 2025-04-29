document.addEventListener("DOMContentLoaded", checkServer);

async function checkServer() {
  const ip = "laBigVanilla22.aternos.me"; // IP predefinito

  const result = document.getElementById("result");
  const statusText = document.getElementById("status-text");
  const playersText = document.getElementById("players-text");
  const motdText = document.getElementById("motd-text");
  const playerListText = document.getElementById("player-list-text");
  const serverIcon = document.getElementById("server-icon");
  const loadingText = document.getElementById("loading-text");

  loadingText.classList.remove("hidden");
  result.classList.add("hidden");

  try {
    const response = await fetch(`https://api.mcsrvstat.us/2/${ip}`);
    const data = await response.json();

    if (data.online) {
      statusText.textContent = `${ip}`;
      if(data.players.online > 1) {
        playerListText.textContent = `${data.players.online} giocatori online: ${data.players.list ? data.players.list.join(", ") : "Nessuno"}`;
      }
      else if(data.players.online == 1) {
        playerListText.textContent = `${data.players.online} giocatore online: ${data.players.list ? data.players.list.join(", ") : "Nessuno"}`;
      }


      if(data.players.online == 0) {
        playerListText.classList.add("offline");
        playerListText.textContent = `Non ci sono giocatori online`;
      }
      if (data.icon) {
        serverIcon.src = data.icon;
        serverIcon.classList.remove("hidden");
      } else {
        serverIcon.classList.add("hidden");
      }

      if (data.motd.clean.join(" ").includes("Server not found")) {
        statusText.textContent = "❌ Server OFFLINE";
        motdText.textContent = "";
        playersText.textContent = "";
        playerListText.textContent = "";
        serverIcon.classList.add("hidden");
      }
      if (data.motd.clean.join(" ").includes("offline")) {
        playerListText.textContent = "Il server e' offline";
      }

    } else {
      statusText.textContent = "❌ Server OFFLINE";
      playersText.textContent = "";
      motdText.textContent = "";
      playerListText.textContent = "";
      serverIcon.classList.add("hidden");
    }

    result.classList.remove("hidden");

  } catch (error) {
    alert("Errore durante la richiesta. Riprova più tardi.");
  }

  loadingText.classList.add("hidden");
}

function parseMinecraftColors(text) {
  return text.replace(/§[0-9a-fklmnor]/g, '').replace(/<.*?>/g, '');
}
