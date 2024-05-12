const access_token = localStorage.getItem("access_token");
const endpoint = "https://api.spotify.com/v1/me/top/";
let type = 'tracks';
let selectedTimeFrame = 'short_term'; 


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
    console.log(usuario);
    const userNameElement = document.getElementById("user-name");
    const userImageElement = document.getElementById("user-image");
    if (usuario && userNameElement && userImageElement) {
        userNameElement.textContent = usuario.display_name;
        userImageElement.src = usuario.images[0].url;
    }
}

mostrarDatosUsuario();

async function obtenerTopTracks(timeFrame) {
    const url = `${endpoint}${type}?limit=10&time_range=${timeFrame}`;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { Authorization: "Bearer " + access_token },
        });
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error(error);
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
                li.textContent = track.name;
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
        console.log(data);
        const lista = document.getElementById("top-tracks");
        lista.innerHTML = '';

        if(type === 'tracks') {
            topTracks.forEach((track) => {
                const li = document.createElement("li");
                li.textContent = track.name;
                lista.appendChild(li);
                //aniade mas informacion de la cancion aqui
            });
        } else {
            topTracks.forEach((artist) => {
                const li = document.createElement("li");
                li.textContent = artist.name;
                lista.appendChild(li);
                //aniade mas informacion del artista aqui
            });
        }
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



mostrarTopTracks(); 