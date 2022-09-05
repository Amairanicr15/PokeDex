/*let pokemons = [];
const poke_container = document.getElementById("poke_container");
const url = "https://pokeapi.co/api/v2/pokemon";
const pokemons_number = 151;
const search = document.getElementById("search");
const form = document.getElementById("form");

const fetchPokemons = async () => {
    for(let i = 1; i <= pokemons_number; i++) {
        await getAllPokemon(i);
    }
    pokemons.forEach((pokemon) => createPokemonCard(pokemon));
};

const removePokemon = () => {
    const pokemonEls = document.getElementsByClassName("pokemon");
    let removablePokemons = [];
    for (let i = 0; i < pokemonEls.length; i++) {
        const pokemonEl = pokemonEls[i];
        removablePokemons = [...removablePokemons, pokemonEl];
    }
    removablePokemons.forEach.forEach((remPoke) => remPoke.remove());
};
const getPokemon = async (id) => {
    const searchPokemons = pokemons.filter((poke) => poke.name === id);
    removePokemon();
    //searchPokemons.forEach((pokemon) => createPokemonCard(pokemon));
};
const getAllPokemon = async (id) => {
    const res = await fetch(`${url}/${id}`);
    const pokemon = await res.json();
    pokemons = [...pokemons,pokemon]; 
};
fetchPokemons();

function createPokemonCard(pokemon) {
    const pokemonEl = document.createElement("div");
    pokemonEl.classList.add("pokemon");
    const poke_types = pokemon.types.map((el) => el.type.name).slice(0, 1)
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const poke_stat = pokemon.stats.map((el) => el.stat.name);
    const stats = poke_stat.slice(0, 3);
    const base_value = pokemon.stats.map((el) => el.base_stat);
    const base_stat = base_value.slice(0, 3);
    const stat = stats.map((stat) => {
        return `<li class="names">${stat}</li>`;
    }).join("");
    const base = base_stat.map((base) => {
        return `<li class="base">${base}</li>`
    }).join("");
    const pokeInnerHTML = `<div class="img-container">
    <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${name}"/>
    </div>
    <div class ="info">
    <span class="number">#${pokemon.id.toString().padStart(3, "0")}</span>
    <h3 class="name">${name}</h3>
    <small class=""type><span>${poke_types}</span></small></div>
    <div class="stats">
    <h2>Stats</h2>
    <div class="flex">
    <ul>${stat}</ul>
    <ul>${base}</ul>
    </div>
    </div>`;
    pokemonEl.innerHTML = pokeInnerHTML;
    poke_container.appendChild(pokemonEl);
}

//Buscar pokemon

pokeForm.addEventListener('submit', e => {
    e.preventDefault();
    let searchPokemon = document.getElementById('pokemon').value;
    getPokemon(searchPokemon, true);
});

function exitModal() {
    const modalPokemon = document.getElementById('modalPokemon'); modalPokemon.style.display = 'none'
    drawPokemon()
} 
*/




const pokeContent = document.getElementById('pokemonContent');
let pokeForm = document.getElementById('searchPokemon');
let generationshow = 1;
const modalSearch = document.getElementById('pokemonContent');
const divGeneration = document.getElementById('textGen')

function showPokemonGen(gen) {
    const pokemonGen ={
        1:[1, 151],
        2:[152, 251],
        3:[252, 386]
    };

    const pokemonGenDefault = [1, 151];
    const generacion = pokemonGen[gen] || pokemonGenDefault;
    return generacion;
}

let pokemonGeneration = showPokemonGen(generationshow)

const drawPokemon = async () => {
    for (let i = pokemonGeneration[0]; i <= pokemonGeneration[1]; i++) {
        await getPokemon(i);
    }
}

const getPokemon = async (id, modal) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const rest = await fetch(url);
    const pokemon = await rest.json();
    createPokemon(pokemon, modal);
}

const colors = {
    fire: '#FFA05D',
    grass: '#8FD594',
    electric: '#FFFE43B',
    water: '#7E97C0',
    ground: '#CAAC4D',
    rock: '#90642D',
    poison: '#9D5B9B',
    bug: '#EAFD71',
    dragon: '#97b3e6',
    psychic: '#FF96B5',
    flying: '#CDCDCD',
    flighting: '#FF5D5D',
    normal: '#FFFFF'    
}

const main_types = Object.keys(colors)

function createPokemon(pokemon, modal) {
    const pokemonEl = document.createElement('div');

    pokemonEl.classList.add('pokemon');

    const poke_types = pokemon.types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const color = colors[type];

    pokemonEl.style.backgroundColor = color;

    if(modal !==true) {
        const pokeInnerHTML = `
        <div class="img-container">
        <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${name}"/> 
        </div> 
        <div class="info">
        <span class="number">#${pokemon.id
                    .toString()
                    .padStart(3, '0')}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Tipo: <span>${type}</span></small>            
        </div>
    `;
        pokemonEl.innerHTML = pokeInnerHTML;
        pokeContent.appendChild(pokemonEl);
    }

    else {
        const pokeInnerHTML = `
        <div class="modal" id="modalPokemon">
        <div class="pokemon">
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${name}"/>
            </div>
            <div class="info">
            <span class="number">#${pokemon.id
                        .toString()
                        .padStart(3, '0')}</span>
                <h3 class="name">${name}</h3>
                <small class="type">Tipo: <span>${type}</span></small>
            </div>
            </div>

            </div>`;

            modalSearch.innerHTML = pokeInnerHTML;
    }
}

drawPokemon();

//Buscar pokemon

pokeForm.addEventListener('submit', e => {
    e.preventDefault();
    let searchPokemon = document.getElementById('pokemon').value;
    getPokemon(searchPokemon, true);
})

function exitModal(){
    const modalPokemon = document.getElementById('modalPokemon');
    modalPokemon.style.display = 'none'
    drawPokemon()
}
