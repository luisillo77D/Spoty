const access_token = localStorage.getItem("access_token");
const endpoint = "https://api.spotify.com/v1/me/top/tracks";
const type = 'tracks'

// Inicializa la autenticación de Spotify al hacer clic en el botón
const getToken = async () => {
    // stored in the previous step
    try {
      const url = "https://accounts.spotify.com/api/token";
      const payload = {
        method: "POST",
        url: url,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: localStorage.getItem("code"),
          redirect_uri: REDIRECT_URI,
        }),
      };
      
      const body = await fetch(url, payload);
      const response = await body.json();
      console.log(response);
      localStorage.setItem("access_token", response.access_token);
    } catch (error) {
      console.error(error);
    }
  };

async function obtenerTopTracks() {
    try {
        await getToken();
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