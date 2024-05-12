const access_token = localStorage.getItem("access_token");
const endpoint = "https://api.spotify.com/v1/me/top/tracks";
const type = 'tracks'

//funcion para obtener los datos del usuario
async function obtenerUsuario() {
    try {
        const respuesta = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: { Authorization: "Bearer " + access_token },
        });
        const datos = await respuesta.json();
        console.log(datos);
        return datos;
    }
    catch (error) {
        console.log(error);
    }
}

console.log(obtenerUsuario());



async function obtenerTopTracks() {
    try {
        const respuesta = await fetch(`${endpoint}?limit=10`, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + access_token,
        },
        });
        const datos = await respuesta.json();
        console.log(datos);
        return datos.items;
    } catch (error) {
        console.log(error);
    }
    }

   //mostrar los datos en el html
async function mostrarTopTracks() {
    const topTracks = await obtenerTopTracks();
    console.log(topTracks);
    const lista = document.getElementById("top-tracks");
    topTracks.forEach((track) => {
        const li = document.createElement("li");
        li.textContent = track.name;
        lista.appendChild(li);
    });
}

mostrarTopTracks();