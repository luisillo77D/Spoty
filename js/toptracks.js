const access_token = localStorage.getItem("access_token");
const endpoint = "https://api.spotify.com/v1/me/top/tracks";
const type = 'tracks'
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

    obtenerTopTracks();