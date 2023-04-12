const url = `https://pokeapi.co/api/v2/pokemon`

document.addEventListener("DOMContentLoaded",()=>{
  render();
})


const getData = async (id) =>{
  try {
    const data = await fetch(`${url}/${id}`)
    const result = await data.json()
    return result
  } catch (error) {
    console.log(error);
  }
}


async function render() {

    const data = [];
    for (let index = 0; index < 20; index++) { 
        data.push(await getData(1));
    }

    console.log(data);
    //return data;
}