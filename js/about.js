const idmaiki = "8p1t32fr8809mos68m9k2qpv7"
const idluisillo ="xmf16un345g4f73i3y631k8kh"
const IDD = "5f49bb2bd6d24e96a3cbfdeffb9071f8"
const SECRET = "b579f422e44f4b289ec5cecb40e1d208"
let token = '';
//funcion para generar el token de acceso
async function obtenerTokenAcceso() {
    const respuesta = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(IDD + ":" + SECRET),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });
    const datos = await respuesta.json();
    console.log(datos);
    return datos.access_token;
  }

//obtener la informacion de los usuarios de spotify
const getSpotifyUser = async (id) => {
    try {
        token = await obtenerTokenAcceso();
        const response = await fetch(`https://api.spotify.com/v1/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }
}

//mostar la informacion de los usuarios de spotify
const showSpotifyUser = async (id) => {
    const user = await getSpotifyUser(id);
    console.log(user);
    const userContainer = document.getElementById('user-container');
    userContainer.innerHTML += `
        <div class="col-2 card bg-warning">
            <div class="h-75">
                <img src="${user.images[1].url}" alt="${user.display_name}" class="rounded w-100 h-100">
            </div>
            <p class="fs-4">${user.display_name}</p>
            <p>${user.followers.total} seguidores</p>
        </div>
    `;
}

showSpotifyUser(idmaiki);
showSpotifyUser(idluisillo);


