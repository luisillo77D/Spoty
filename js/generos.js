ACCESS_TOKEN = localStorage.getItem('access_token');
URLI ="https://api.spotify.com/v1/recommendations/available-genre-seeds"
let generos = {};

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
