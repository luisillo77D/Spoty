
const CLIENT_ID = "5f49bb2bd6d24e96a3cbfdeffb9071f8";
const CLIENT_SECRET = "b579f422e44f4b289ec5cecb40e1d208";
const REDIRECT_URI = "http://localhost:3000/callback.html"  ;

  // Inicializa la autenticación de Spotify al hacer clic en el botón
const getToken = async (code) => {
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
          code,
          redirect_uri: REDIRECT_URI,
        }),
      };
      
      const body = await fetch(url, payload);
      const response = await body.json();
      console.log(response.access_token);
      localStorage.setItem("access_token", response.access_token);
    } catch (error) {
      console.error(error);
    }
  };

  async function callback() {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    localStorage.setItem("code", code);
    await getToken(code);
    window.location.href = "topTracks.html";
  }

    callback();