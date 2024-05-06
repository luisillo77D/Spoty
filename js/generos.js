ACCESS_TOKEN 
URLI ="https://api.spotify.com/v1/recommendations/available-genre-seeds"
const CLIENT_ID = "5f49bb2bd6d24e96a3cbfdeffb9071f8";
const CLIENT_SECRET = "b579f422e44f4b289ec5cecb40e1d208";
let generos = {};

//funcion para generar el token de acceso
async function obtenerTokenAcceso() {
  const respuesta = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const datos = await respuesta.json();
  console.log(datos);
  return datos.access_token;
}

ACCESS_TOKEN = await obtenerTokenAcceso();

const getGeneros = async () => {
  try {
    const url = URLI;
    const payload = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };
    const body = await fetch(url, payload);
    const response = await body.json();
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const mostrarGeneros = async () => {
    const generos = await getGeneros();
    const generosDiv = document.getElementById("genres-list");
    generos.genres.forEach((genero) => {
        const generoDiv = document.createElement("div");
        generoDiv.textContent = genero;
        generosDiv.appendChild(generoDiv);
    });
    };

mostrarGeneros();
