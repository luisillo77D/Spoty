const access_token = localStorage.getItem("access_token");
const endpoint = "https://api.spotify.com/v1/me/top/";
let type = "tracks";
let selectedTimeFrame = "short_term";
let userID;
let playlistID;
let trackURIs = [];

async function obtenerDatosUsuario() {
  try {
    const respuesta = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: "Bearer " + access_token },
    });
    const datos = await respuesta.json();
    userID = datos.id;
    return datos;
  } catch (error) {
    console.log(error);
  }
}

async function mostrarDatosUsuario() {
  const usuario = await obtenerDatosUsuario();
  console.log(usuario);
  const userNameElement = document.getElementById("user-name");
  const userImageElement = document.getElementById("user-image");
  if (usuario && userNameElement && userImageElement) {
    userNameElement.textContent = usuario.display_name;
    userImageElement.src = usuario.images[0].url;
  }
}

mostrarDatosUsuario();

function setTimeFrame(timeFrame) {
  selectedTimeFrame = timeFrame;
  actualizarTopTracks();
}

function setType(selectedType) {
  type = selectedType;
  actualizarTopTracks();
}

async function actualizarTopTracks() {
  const timeFrame = selectedTimeFrame;
  const url = `${endpoint}${type}?limit=10&time_range=${timeFrame}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: "Bearer " + access_token },
    });
    const data = await response.json();
    const topTracks = data.items;
    trackURIs = data.items.map((item) => item.uri);
    const lista = document.getElementById("top-tracks");
    lista.innerHTML = "";

    topTracks.forEach((item) => {
      const iframe = document.createElement("iframe");
      iframe.style.border = "none";
      //quitar el borde del iframe
      iframe.style.borderRadius = "15";
      iframe.width = "600";
      iframe.height = "80";
      iframe.allow = "encrypted-media";
      if (type === "tracks") {
        iframe.src = `https://open.spotify.com/embed/track/${item.id}`;
      } else {
        iframe.src = `https://open.spotify.com/embed/artist/${item.id}`;
      }
      lista.appendChild(iframe);
    });
  } catch (error) {
    console.log(error);
  }
}
function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("expires_in");
  window.location.href = "index.html";
}

document.getElementById("logout-btn").addEventListener("click", logout);

mostrarDatosUsuario();
actualizarTopTracks();

function msToMinSec(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
function setType(selectedType) {
  type = selectedType;
  const metricTitle = document.getElementById("metric-title");
  const topTracksList = document.getElementById("top-tracks");

  if (type === "artists") {
    metricTitle.textContent = "Top Artistas";
  } else {
    metricTitle.textContent = "Top Tracks";
  }

  topTracksList.classList.add("list-item");

  actualizarTopTracks();
}

//funcion para crear playlist con los top tracks
async function createPlaylist() {
  const url = `https://api.spotify.com/v1/users/${userID}/playlists`;
  const data = {
    name: "Top Tracks",
    description: "Top 10 tracks",
    public: false,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const playlist = await response.json();
    return playlist.id;
  } catch (error) {
    console.error(error);
  }
}

//funcion para agregar tracks a la playlist
async function addTracksToPlaylist(trackURIs) {
  playlistID = await createPlaylist();
  const url = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uris: trackURIs, position: 0 }),
    });
    console.log(JSON.stringify({ uris: trackURIs, position: 0 }));
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

document.getElementById("save-playlist").addEventListener("click", async () => {
  if (type === "tracks") {
    try {
      await addTracksToPlaylist(trackURIs);
      await showPlaylist();
      alert("Playlist creada con éxito");
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log("No se pueden agregar artistas a la playlist");
  }
});

//funcio para mostrar el iframe de la playlist creada
async function showPlaylist() {
  const playlistElement = document.getElementById("playlist-cont");
  playlistElement.innerHTML = "";
  const iframe = document.createElement("iframe");
  iframe.src = `https://open.spotify.com/embed/playlist/${playlistID}`;
  iframe.width = "90%";
  iframe.height = "380";
  iframe.frameborder = "0";
  iframe.allowtransparency = "true";
  iframe.allow = "encrypted-media";
  iframe.style.border = "none";
  iframe.style.borderRadius = "15";
  playlistElement.appendChild(iframe);
}
