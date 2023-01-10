    
// Inicializamos las variables principales.

let characters = [];
let cuantosPokemones = 23;

// Nos aseguramos de que todos los pokemon (characters) se han cargado en orden en el array.

const getPokemons = async () => {
    
    for (let i = 1; i <= cuantosPokemones; i++) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${+i}/`);
        const result = await res.json();
        characters.push(result);         
    } 

    crearPokemon();
    console.log(characters);
};


const crearPokemon = async() => {


    for (const character of characters) {

        
        const card$$ = document.createElement("div");
        const name$$ = document.createElement("h3");
        const imagen$$ = document.createElement("img");
        const type$$ = document.createElement("p");
        const number$$ = document.createElement("p");
        const imagenContainer$$ = document.createElement("div");
    

        imagenContainer$$.classList.add("img-container");
        card$$.classList.add("card");
        name$$.textContent = character.name;
        imagen$$.src = character.sprites.front_default;
        number$$.textContent = `# ${character.id}`;
        type$$.textContent = character.types[0].type.name;
        

        imagenContainer$$.appendChild(imagen$$);
        card$$.appendChild(name$$);
        card$$.appendChild(imagenContainer$$);
        card$$.appendChild(number$$);
        card$$.appendChild(type$$);

        pokemonContainer.appendChild(card$$);


    }

}

const pokemonContainer = document.querySelector(".container");

getPokemons();
