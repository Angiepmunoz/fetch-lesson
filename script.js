const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault(); // doesn't refresh
  const { id } = event.target; //deconstruct event.target
  // const id = event.target.id
  getPokemonByID(id.value); //pass id value to our getPokemonByID func
  form.reset();
});

function getPokemonByID(id) {
  fetch(`${BASE_URL}/${id}`)
    .then((response) => response.json()) // promise we're expecting from the api - parsing json into JS
    .then((result) => {
      const pokemon = createPokemonArticle(result);
      document.querySelector(".pokemon").append(pokemon);
    }) // the result
    .catch((error) => {
      const message = createErrorMessage(error);
      document.querySelector("main").append(message);
    }); // the error
}

function createPokemonArticle(pokemon) {
  // creating pokemon article for pokemon section
  const article = document.createElement("article");
  article.innerHTML = `<img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
    <h2>${pokemon.name} (#${pokemon.order})</h2>
  `;
  return article;
}

function createErrorMessage(message) {
  // creating error section
  const section = document.createElement("section");
  section.classList.add("error");
  section.innerHTML = `
      <p>There was an error!</p>
      <p class="message">${error}</p>
    `;
  return section;
}

// getPokemonByID(5);
