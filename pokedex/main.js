const listaPokemon = document.getElementById("listaPokemon");
const btnPoke = document.querySelectorAll(".btn-type");

const url = `https://pokeapi.co/api/v2/pokemon`;

const getData = async (id) => {
  try {
    const data = await fetch(`${url}/${id}`);
    const result = await data.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

async function render() {
  for (let index = 1; index <= 1008; index++) {
    mostrarPokemon(await getData(index));
  }
  console.log("Fin");
}
render();

function mostrarPokemon(pokemon) {
  let tipos = pokemon.types.map(
    (type) =>
      `<li class="list-group-item rounded-pill  text-light ${type.type.name}">${
        type.type.name[0].toUpperCase() + type.type.name.substring(1)
      }</li>`
  );
  tipos = tipos.join("");

  let pokeID = pokemon.id.toString();
  if (pokeID.length === 1) {
    pokeID = "00" + pokeID;
  } else if (pokeID.length === 2) {
    pokeID = "0" + pokeID;
  }

  let pokeName = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);

  const div = document.createElement("div");
  div.classList.add("col-12", "col-sm-6", "col-lg-4", "col-xl-3");
  div.innerHTML = `
   <div class="card text-center fs-5">
            <div class="card-header">
              <div class="row justify-content-center fs-4">
                <p class="col-auto text-reset text-center pt-3">${pokeName}</p>
                <p class="col-auto text-reset text-center pt-3">${pokeID}</p>
              </div>
            </div>
            <div class="card-body">
              <img
                src="${pokemon.sprites.other["official-artwork"].front_default}"
                class="img-fluid m-auto"
                alt="${pokemon.name}"
              />
              <div class="card-title row justify-content-center">
                <p class="col-auto fs-4">Height: ${pokemon.height} ft</p>
                <p class="col-auto fs-4">Weight: ${pokemon.weight} kg</p>
              </div>
              <div class="card-text">
              <p>Tipo Pokemon</p>
                <ul class="list-group list-group-flush list-group-horizontal justify-content-evenly ">
                  ${tipos}
                </ul>
              </div>
            </div>
          </div>
  `;
  listaPokemon.append(div);
}

btnPoke.forEach((boton) =>
  boton.addEventListener("click", async (event) => {
    const btnId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i < 1008; i++) {
      try {
        const data = await fetch(`${url}/${i}`);
        const result = await data.json();
        if (btnId === "all") {
          mostrarPokemon(result);
        } else {
          const btnTipos = result.types.map((type) => type.type.name);
          if (btnTipos.some((btnTipos) => btnTipos.includes(btnId))) {
            mostrarPokemon(result);
          }
        }
        console.log("Fin Busqueda Por Button");
      } catch (error) {
        console.log(error);
      }
    }
  })
);
