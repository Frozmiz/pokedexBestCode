// Inicializamos las variables principales.

let pokemones = [];
let cuantosPokemones = 23;

// Nos aseguramos de que todos los pokemon (pokemones) se han cargado en orden en el array.

const getPokemons = async () => {
  for (let i = 1; i <= cuantosPokemones; i++) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${+i}/`);
    const result = await res.json();
    pokemones.push(result);
  }

  
  crearPokemon();
  crearBotones();
  console.log(pokemones);
};

const crearBotones = () => {

  const buttons$$ = document.querySelector(".buttons");
  const types = [];

  for (const pokemon of pokemones) {
    for (const type of pokemon.types) {
      if (!types.includes(type.type.name)) {
        types.push(type.type.name);
      }
    }
  }
  console.log(types);

  for (tipos of types) {

        const button$$ = document.createElement("button");

        button$$.textContent = tipos;

        buttons$$.appendChild(button$$);

  };

};

const crearPokemon = async () => {
  for (const pokemon of pokemones) {
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

    pokemonContainer.appendChild(card$$);

    // console.log(pokemon.types);
  }
};

const pokemonContainer = document.querySelector(".container");

getPokemons();
