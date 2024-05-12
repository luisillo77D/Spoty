const access_token = localStorage.getItem("access_token");
const endpoint = "https://api.spotify.com/v1/me/top/tracks";
const type = 'tracks';
let selectedTimeFrame = ''; 


async function obtenerDatosUsuario() {
    try {
        const respuesta = await fetch("https://api.spotify.com/v1/me", {
            method: "GET",
            headers: { Authorization: "Bearer " + access_token },
        });
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.log(error);
    }
}

async function mostrarDatosUsuario() {
    const usuario = await obtenerDatosUsuario();
    const userNameElement = document.getElementById("user-name");
    const userImageElement = document.getElementById("user-image");
    if (usuario && userNameElement && userImageElement) {
        userNameElement.textContent = usuario.display_name;
        userImageElement.src = usuario.images[0].url;
    }
}

async function mostrarTopTracks() {
    try {
        const topTracks = await obtenerTopTracks(selectedTimeFrame);
        console.log(topTracks);
        const lista = document.getElementById("top-tracks");
        if (lista) { 
            lista.innerHTML = '';
            topTracks.forEach((track) => {
                const li = document.createElement("li");
                li.innerHTML = `<strong>${track.name}</strong> - ${track.artists[0].name} (${msToMinSec(track.duration_ms)})`;
                lista.appendChild(li);
            });
        } else {
            console.error('Elemento "top-tracks" no encontrado');
        }
    } catch (error) {
        console.error(error);
    }
}

function setTimeFrame(timeFrame) {
    selectedTimeFrame = timeFrame;
    actualizarTopTracks();
}

async function actualizarTopTracks() {

    const timeFrame = selectedTimeFrame; 
    const url = `${endpoint}?limit=10&time_range=${timeFrame}`; 

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { Authorization: "Bearer " + access_token },
        });
        const data = await response.json();
        const topTracks = data.items;

        const lista = document.getElementById("top-tracks");
        lista.innerHTML = '';

        topTracks.forEach((track) => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${track.name}</strong> - ${track.artists[0].name} (${msToMinSec(track.duration_ms)})`;
            li.classList.add('fade-in'); 
            lista.appendChild(li);
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
mostrarTopTracks(); 


function msToMinSec(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
}
