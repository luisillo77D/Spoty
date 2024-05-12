const CLIENT_ID = "5f49bb2bd6d24e96a3cbfdeffb9071f8";
const CLIENT_SECRET = "b579f422e44f4b289ec5cecb40e1d208";

// URL de redireccionamiento después de la autenticación
const REDIRECT_URI = "http://localhost:3000/callback.html";

console.log(localStorage.getItem("code"));
console.log(localStorage.getItem("access_token"));

// URL del punto final de autorización de Spotify
const AUTHORIZATION_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20user-read-recently-played%20user-top-read%20user-read-recently-played`;

async function iniciarAutenticacionSpotify() {
  // redirect to the URL in new tab to start the auth process
  window.open(AUTHORIZATION_URL, "_self");

}



// Asocia la función de inicio de autenticación al botón de clic
const botonAutenticacion = document.getElementById("boton-spotify");
botonAutenticacion.addEventListener("click", iniciarAutenticacionSpotify);

const botonGenerar= document.getElementById("generate");

//evento listener para el boton de generar, para que nos redirija a generos.html en caso de que ya tengamos el token si no iniciamos la autenticación
botonGenerar.addEventListener("click", async () => {
  await iniciarAutenticacionSpotify();
});


