import "./style.css";

const buscador = document.getElementById("buscador");
const boton_buscar = document.getElementById("boton_buscar");
const gif_resultado = document.getElementById("gif_resultado");

async function buscarGif(query) {
  try {
    const apiKey = "B8U19EEkR546ZFVoSEROtD3rKJo2xW4w";
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=6&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
    const response = await fetch(url);
    const data = await response.json();
    const gifs = data.data.map((gif) => ({
      url: gif.images.fixed_height.url,
    }));
    mostrarGif(gifs);
  } catch (error) {
    console.error("ERROR, no se pudo obtener GIFs", error);
  }
}
function mostrarGif(gifs) {
  gif_resultado.innerHTML = gifs
    .map(
      (gif) => `
        <div class="gif-item">
          <img src="${gif.url}" alt="${buscador} GIF">
        </div>
    `
    )
    .join("");
}

boton_buscar.addEventListener("click", async () => {
  const query = buscador.value.trim();
  if (query) {
    await buscarGif(query);
    buscador.value = "";
  }
});
