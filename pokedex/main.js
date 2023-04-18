const listaPokemon = document.getElementById("listaPokemon");

const url = `https://pokeapi.co/api/v2/pokemon`;

// document.addEventListener("DOMContentLoaded", () => {
//   render();
// });

const getData = async (id) => {
  try {
    const data = await fetch(`${url}/${id}`);
    const result = await data.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const data = [];

async function render() {
  for (let index = 1; index <= 10; index++) {
    data.push(await getData(index));
    mostrarPokemon(await getData(index));
  }
  console.log(data);
  //return data;
}
render();

function mostrarPokemon(pokemon) {
  let tipos = pokemon.types.map(
    (type) => `<p class="${type.type.name}">${type.type.name}</p>`
  );
  tipos = tipos.join("");

  let pokeID = pokemon.id.toString();
  if (pokeID.length === 1) {
    pokeID = "00" + pokeID;
  } else if (pokeID.length === 2) {
    pokeID = "0" + pokeID;
  }

  const div = document.createElement("div");
  div.classList.add("col-12");
  div.classList.add("col-sm-3");
  div.innerHTML = `
   <div class="card text-center fs-5">
            <div class="card-header">
              <div class="row justify-content-center">
                <p class="col-auto text-reset text-center">${pokemon.name}</p>
                <p class="col-auto text-reset text-center">${pokeID}</p>
              </div>
            </div>
            <div class="card-body">
              <img
                src="${pokemon.sprites.other["official-artwork"].front_default}"
                class="img-fluid m-auto"
                alt="${pokemon.name}"
              />
              <div class="card-title row justify-content-center">
                <p class="col-auto">height : ${pokemon.height} ft</p>
                <p class="col-auto">weight: ${pokemon.weight} kg</p>
              </div>
              <div class="card-text">
                <ul class="list-group list-group-flush">
                  ${tipos}
                </ul>
              </div>
            </div>
          </div>
  `;
  listaPokemon.append(div);
}
