// Inicializamos las variables principales.

let pokemones = [];
let cuantosPokemones = 150;


// BUSCADOR (EL addEventListener del boton está al final del código)

const buscador$$ = document.querySelector(".buscador");

const buscar = () => {

  const pokemonesFiltered = pokemones.filter((pokemon) => {

    return pokemon.name.toLowerCase().includes(buscador$$.value.toLowerCase());

  });

  crearPokemon(pokemonesFiltered);

}

// Nos aseguramos de que todos los pokemon (pokemones) se han cargado en orden en el array.

const getPokemons = async () => {
  for (let i = 1; i <= cuantosPokemones; i++) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${+i}/`);
    const result = await res.json();
    pokemones.push(result);
  }

  crearBotones();
  crearPokemon(pokemones);
  console.log(pokemones);
};

// Filtramos nuestro array de pokemons y que solo nos retorne los pokemons que coincidan con el parámetro seleccionado.
// La función que filtra devuelve un array nuevo filtrado.
// Estoy retornando los pokemons que cumplen la condición.

const filtrar = (type) => {
  const pokemonesFiltered = pokemones.filter((pokemon) => {
    let encontrado = false;
    for (const tipo of pokemon.types) {
      if (tipo.type.name === type) {
        encontrado = true;
      }
    }
    if (encontrado) {
      return pokemon;
    }
    // return pokemon.types[0].type.name === type;
  });

  crearPokemon(pokemonesFiltered);
};

const crearBotones = () => {
  const buttons$$ = document.querySelector(".buttons");
  const buttonAllDiv$$ = document.querySelector(".buttonAllDiv")
  const types = [];

  for (const pokemon of pokemones) {
    for (const type of pokemon.types) {
      if (!types.includes(type.type.name)) {
        types.push(type.type.name);
      }
    }
  }
  console.log(types);

// BOTON MOSTRAR TODOS LOS POKEMONS

  const buttonAll$$ = document.createElement("button");
  buttonAll$$.textContent = "Mostrar todos";
  buttonAll$$.classList.add("buttonAll");
  buttonAllDiv$$.appendChild(buttonAll$$);
  buttonAll$$.addEventListener("click", () => crearPokemon(pokemones));
  
  

// BOTONES DE FILTRADO POR CLASES 

  for (const tipo of types) {
    const button$$ = document.createElement("button");
    button$$.textContent = tipo;
    button$$.addEventListener("click", () => filtrar(tipo));
    buttons$$.appendChild(button$$);
    
  }
};

const crearPokemon = (pokemonesToPrint) => {
  pokemonContainer$$.innerHTML = "";

  for (const pokemon of pokemonesToPrint) {
    const card$$ = document.createElement("div");
    const name$$ = document.createElement("h3");
    const imagen$$ = document.createElement("img");
    const type$$ = document.createElement("p");
    const number$$ = document.createElement("p");
    const imagenContainer$$ = document.createElement("div");

    imagenContainer$$.classList.add("img-container");
    card$$.classList.add("card");
    name$$.textContent = pokemon.name;
    imagen$$.src = pokemon.sprites.front_default;
    number$$.textContent = `# ${pokemon.id}`;
    type$$.textContent = pokemon.types[0].type.name;

    imagenContainer$$.appendChild(imagen$$);
    card$$.appendChild(name$$);
    card$$.appendChild(imagenContainer$$);
    card$$.appendChild(number$$);
    card$$.appendChild(type$$);

    pokemonContainer$$.appendChild(card$$);

    // console.log(pokemon.types);
  }
};


const pokemonContainer$$ = document.querySelector(".container");
buscador$$.addEventListener("input", buscar);
getPokemons();





