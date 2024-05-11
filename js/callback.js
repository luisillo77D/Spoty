
const CLIENT_ID = "5f49bb2bd6d24e96a3cbfdeffb9071f8";
const CLIENT_SECRET = "b579f422e44f4b289ec5cecb40e1d208";

  async function callback() {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    localStorage.setItem("code", code);
    window.location.href = "topTracks.html";
  }

    callback();