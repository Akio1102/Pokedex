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

function mostrarPokemon(a) {
  const div = document.createElement("div");
  div.classList.add("col-3");
  div.innerHTML = `
   <div class="card text-center fs-3">
            <div class="card-header">
              <div class="row">
                <p class="col-10 text-reset">${a.name}</p>
                <p class="col-2 text-reset">${a.id}</p>
              </div>
            </div>
            <div class="card-body">
              <img
                src="../assets/PokemonDiamante.jpg"
                class="img-fluid m-auto"
                alt="..."
              />
              <div class="card-title row">
                <p class="col-6">weight</p>
                <p class="col-6">height</p>
              </div>
              <div class="card-text">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Tipos</li>
                </ul>
              </div>
            </div>
          </div>
  `;
  listaPokemon.append(div);
}
