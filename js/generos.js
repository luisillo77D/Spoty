let ACCESS_TOKEN 
URLI ="https://api.spotify.com/v1/recommendations/available-genre-seeds"
const CLIENT_ID = "5f49bb2bd6d24e96a3cbfdeffb9071f8";
const CLIENT_SECRET = "b579f422e44f4b289ec5cecb40e1d208";
let generos = {
  pop: {
      genres: "pop",
      artistas: ["06HL4z0CvFAxyc27GXpf02", "66CXWjxzNUsdJxJ2JdwvnR", "6eUKZXaKkcviH0Ku9w2n3V", "6qqNVTkY8uBg9cP3Jd7DAH", "1uNFoZAHBGtllmzznpCI3s"],
      selected: false
  },
  hipHop: {
      genres: "hip-hop",
      artistas: ["3TVXtAsR1Inumwj472S9r4", "5K4W6rqBFWDnAN6FQUkS6x", "0Y5tJX1MQlPlqiwlOH1tJY", "246dkjvS1zLTtiykXe5h60", "4kYSro6naA4h99UJvo89HB"],
      selected: false
  },
  rock: {
      genres: "rock",
      artistas: ["3WrFJ7ztbogyGnTHbHJFl2", "1dfeR4HaWDbWqFHLkxsg1d", "36QJpDe2go2KgaRleHCDTp", "0k17h0D3J5VfsdmQ1iZtE9", "711MCceyCBcFnzjGY4Q7Un"],
      selected: false
  },
  reggaeton: {
      genres: "reggaeton",
      artistas: ["4VMYDCV2IEDYJArk749S6m", "4q3ewBCX7sLwd24euuV69X", "6nVcHLIgY5pE2YCl8ubca1", "2LRoIwlKmHjgvigdNGBHNo", "2R21vXR83lH98kGeO99Y66"],
      selected: false
  },
  rap: {
      genres: "rap",
      artistas: ["7dGJo4pcD2V6oG8kP0tJRR", "3nFkdlSjzX9mRTtwJOzDYB", "2YZyLoL8N0Wb9xBt1NhZWg", "20qISvAhX20dpIbOOzGK3q", "5me0Irg2ANcsgc93uaYrpb"],
      selected: false
  },
  indie: {
      genres: "indie",
      artistas: ["7Ln80lUS6He07XvHI8qqHH", "0epOFNiUfyON9EYx7Tpr6V", "5INjqkS1o8h1imAzPqGZBb", "5BvJzeQpmsdsFp4HGUYUEx", "4Z8W4fKeB5YxbusRsdQVPb"],
      selected: false
  },
  corridosTumbados: {
      genres: "latin,latino",
      artistas: ["0elWFr7TW8piilVRYJUe4P", "0ys2OFYzWYB5hRDLCsBqxt", "7Gi6gjaWy3DxyilpF1a8Is", "3l9G1G9MxH6DaRhwLklaf5", "12GqGscKJx3aE4t07u7eVZ"],
      selected: false
  },
  latinpop: {
      genres: "latin,latino,pop",
      artistas: ["1jtvmXiemNFkPO11NMdjfu", "4boI7bJtmB1L3b1cuL75Zr", "31VFEohvhOUKrtAONEBhMG", "1b7AEdUSudOQoZF5ebUxCL", "6XTGKOV9jceQ6f67lnhpbF"],
      selected: false
  },
  kpop: {
      genres: "k-pop",
      artistas: ["3Nrfpe0tUJi4K4DXYWgMUX", "7n2Ycct7Beij7Dj7meI4X0", "2KC9Qb60EaY0kW4eH68vr3", "41MozSoPIsD1dJM0CLPjZF", "2AfmfGFbe0A0WsTYm0SDTx"],
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
  return datos.access_token;
}

ACCESS_TOKEN = obtenerTokenAcceso();

//funcion para obtener la url de la imagen del artista
async function obtenerImagenArtista(id) {
  try {
    const respuesta = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
    headers: {
      Authorization: "Bearer " +  ACCESS_TOKEN,
    },
  });
  const datos = await respuesta.json();
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
      imagen.push(await obtenerImagenArtista(artista));
    }
    
    generoHTML.innerHTML = `
    <div class="card col-10">
      <h2>${genero}</h2>
      <div class="artistas">
        ${imagen.map((img) => `<img src="${img}" alt="imagen artista" width=75px height=75px style="object-fit: cover;" class="rounded-circle">`).join("")}
        </div>
        <button class="btn btn-primary mt-3 select">Seleccionar</button>
      </div>
    `;
    //agregar evento al boton de seleccionar
    generoHTML.querySelector(".select").addEventListener("click", () => {
      generos[genero].selected = !generos[genero].selected;
      if (generos[genero].selected) {
        generoHTML.querySelector(".card").classList.add("border-primary", "border-3", );
      } else {
        generoHTML.querySelector(".card").classList.remove("border-primary", "border-3");
      }
    });
    
    generosHTML.appendChild(generoHTML);
  }
}

//ejecutar la funcion mostrarGeneros con await para esperar a que se resuelva la promesa
mostrarGeneros();

