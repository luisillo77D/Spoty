const endArtist = "https://api.spotify.com/v1/search?q=exitos+mexico&type=playlist&limit=1"
let ACCESS_TOKEN 
const CLIENT_IDD = "5f49bb2bd6d24e96a3cbfdeffb9071f8";
const CLIENT_SECRET = "b579f422e44f4b289ec5cecb40e1d208";

//funcion para generar el token de acceso
async function obtenerTokenAcceso() {
    const respuesta = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(CLIENT_IDD + ":" + CLIENT_SECRET),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });
    const datos = await respuesta.json();
    console.log(datos);
    return datos.access_token;
  }
  

  //funcion para obtener el href de la playlist
  async function getPlaylistID() {
    ACCESS_TOKEN = await obtenerTokenAcceso();
    const response = await fetch(endArtist, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    const data = await response.json();
    console.log(data.playlists.items[0].href);
    return data.playlists.items[0].href;
  }

  async function getTracks() {
    const url = await getPlaylistID();
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    const data = await response.json();
    console.log(data);
    return data.tracks.items;
  }

  async function showTracks() {
    const tracks = await getTracks();
    const trackList = document.getElementById("track-list");
    tracks.slice(0, 10).forEach((track) => {
      const trackItem = document.createElement("div");
      trackItem.classList.add("card","d-flex","flex-row");
      trackItem.innerHTML = `
      <div class="card-image">
        <img src="${track.track.album.images[1].url}" alt="${track.track.name}" class="rounded">
      </div>
      <div class="card-content d-flex align-items-center justify-content-center flex-column w-100">
        <p class="fs-2">${track.track.name}</p>
        <p class="fs-4">${track.track.artists
          .map((artist) => artist.name)
          .join(", ")}</p>
        <div>
          <a href="${track.track.external_urls.spotify}" target=_blank class="btn btn-success">Escuchar</a>
        </div>
        </div>`;

      trackList.appendChild(trackItem);
    });
  }
  showTracks();


  //funcion para obtener los nuevos lanzamientos 
  async function getNewReleases() {
    ACCESS_TOKEN = await obtenerTokenAcceso();
    const response = await fetch("https://api.spotify.com/v1/browse/new-releases?limit=6", {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    const data = await response.json();
    console.log(data);
    return data.albums.items;
  }

  async function showNewReleases() {
    const newReleases = await getNewReleases();
    const newReleasesList = document.getElementById("new-releases");
    newReleases.slice(0, 10).forEach((release) => {
      const releaseItem = document.createElement("div");
      releaseItem.classList.add("card","d-flex","flex-column");
      releaseItem.innerHTML = `
      <div class="card-image w-100">
        <img src="${release.images[0].url}" alt="${release.name}" class="rounded w-100">
      </div>
      <div class="card-content d-flex align-items-center justify-content-center flex-column w-100 text-center">
        <p class="fs-2">${release.name}</p>
        <p class="fs-4">${release.artists
          .map((artist) => artist.name)
          .join(", ")}</p>
        <div>
          <a href="${release.external_urls.spotify}" target=_blank class="btn btn-success">Escuchar</a>
        </div>
        </div>`;
      newReleasesList.appendChild(releaseItem);
    }
    );
  }
  showNewReleases();