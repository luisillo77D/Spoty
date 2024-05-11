let ACCESS_TOKEN 
URLI ="https://api.spotify.com/v1/recommendations/available-genre-seeds"
const CLIENT_ID = "5f49bb2bd6d24e96a3cbfdeffb9071f8";
const CLIENT_SECRET = "b579f422e44f4b289ec5cecb40e1d208";
const btnGeneros = document.getElementById("btn-generos");
//borramos el local storage
localStorage.removeItem("genres");
localStorage.removeItem("artistas");
let generos = {
  pop: {
      genres: "pop",
      artistas: ["06HL4z0CvFAxyc27GXpf02", "66CXWjxzNUsdJxJ2JdwvnR"],
      selected: false
  },
  hipHop: {
      genres: "hip-hop",
      artistas: ["3TVXtAsR1Inumwj472S9r4", "5K4W6rqBFWDnAN6FQUkS6x"],
      selected: false
  },
  rock: {
      genres: "rock",
      artistas: ["3WrFJ7ztbogyGnTHbHJFl2", "1dfeR4HaWDbWqFHLkxsg1d"],
      selected: false
  },
  reggaeton: {
      genres: "reggaeton",
      artistas: ["4VMYDCV2IEDYJArk749S6m", "4q3ewBCX7sLwd24euuV69X"],
      selected: false
  },
  rap: {
      genres: "rap",
      artistas: ["7dGJo4pcD2V6oG8kP0tJRR", "3nFkdlSjzX9mRTtwJOzDYB"],
      selected: false
  },
  indie: {
      genres: "indie",
      artistas: ["7Ln80lUS6He07XvHI8qqHH", "0epOFNiUfyON9EYx7Tpr6V"],
      selected: false
  },
  corridosTumbados: {
      genres: "latin",
      artistas: ["0elWFr7TW8piilVRYJUe4P", "0ys2OFYzWYB5hRDLCsBqxt"],
      selected: false
  },
  latinpop: {
      genres: "latin,pop",
      artistas: ["1jtvmXiemNFkPO11NMdjfu", "4boI7bJtmB1L3b1cuL75Zr"],
      selected: false
  },
  kpop: {
      genres: "k-pop",
      artistas: ["3Nrfpe0tUJi4K4DXYWgMUX", "7n2Ycct7Beij7Dj7meI4X0"],
      selected: false
  },
  
};

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
  localStorage.setItem("token", datos.access_token);
  return datos.access_token;
}

async function obtenerToken() {
  ACCESS_TOKEN = await obtenerTokenAcceso();
}

obtenerToken();

//funcion para obtener la url de la imagen del artista
async function obtenerImagenArtista(id) {
  try {
    const respuesta = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
    headers: {
      Authorization: "Bearer " +  ACCESS_TOKEN,
    },
  });
  const datos = await respuesta.json();
  console.log(datos.name);
  return datos.images[0].url;
  } catch (error) {
    console.log(error); 
  }
}

//funcion para mostrar los generos obtenidos del objeto generos
async function mostrarGeneros() {
  const generosHTML = document.getElementById("genres-list");
  generosHTML.innerHTML = "";
  for (const genero in generos) {
    const generoHTML = document.createElement("div");
    generoHTML.classList.add("col-4","d-flex","justify-content-center","align-items-center","mb-3");
    //recorremos cada cada arista del genero y obtenemos la url de la imagen
    let imagen =[]
    for (const artista of generos[genero].artistas) {
      console.log(artista);
      imagen.push(await obtenerImagenArtista(artista));
    }
  
    generoHTML.innerHTML = `
    <div class="card col-10 bg-success-subtle">
      <h2 class="p-2">${genero}</h2>
      <div class="artistas p-2">
        ${imagen.map((img) => `<img src="${img}" alt="imagen artista" width=75px height=75px style="object-fit: cover;" class="rounded-circle">`).join("")}
        </div>
        <button class="btn btn-primary mt-3 select">Seleccionar</button>
      </div>
    `;
    //agregar evento al boton de seleccionar
    generoHTML.querySelector(".select").addEventListener("click", () => {
      generos[genero].selected = !generos[genero].selected;
      if (generos[genero].selected) {
        generoHTML.querySelector(".card").classList.add("bg-success" );
        generoHTML.querySelector(".card").classList.remove("bg-success-subtle");
      } else {
        generoHTML.querySelector(".card").classList.remove("bg-success");
        generoHTML.querySelector(".card").classList.add("bg-success-subtle");
      }
    });
    
    generosHTML.appendChild(generoHTML);
  }
}

mostrarGeneros();

btnGeneros.addEventListener("click", () => {
  console.log(generos);
  //agregamos solo los generos seleccionados al local storage
  let generosSeleccionados = [];
  let artistaSeleccionados = [];
  for (const genero in generos) {
    if (generos[genero].selected) {
      generosSeleccionados.push(generos[genero].genres);
      artistaSeleccionados.push(generos[genero].artistas);
    }
  }
  localStorage.setItem("genres", JSON.stringify(generosSeleccionados));
  localStorage.setItem("artistas", JSON.stringify(artistaSeleccionados));
  window.location.href = "canciones.html";
  
});

