import listView from './listView.js';


const search_input = document.getElementById('search');
const search_btn = document.getElementById('search_btn');

/*Get API URL*/
//api https://pokeapi.co/docs/v2#pokemon
let url = "https://pokeapi.co/api/v2/pokemon";


async function getPokemonData(inputValue){
    
    let sectionPokemon = document.getElementById("pokemon");
    document.getElementById('error').classList.add('hidden');

    if(inputValue == ""){
        document.getElementById('error').innerHTML = "Please fill out with a valid Pokémon name";
        document.getElementById('error').classList.remove('hidden');
        document.getElementById('pokemon').classList.add('hidden');
        return;
    }

    const url = `https://pokeapi.co/api/v2/pokemon/${inputValue.toLowerCase()}`
    const response = await fetch(url)

    if(response.status == 404 || response.statusText == 'Not Found'){

        document.getElementById('error').innerHTML = "Sorry! We don't know this Pokémon";
        document.getElementById('error').classList.remove('hidden');
        document.getElementById('pokemon').classList.add('hidden');
        return;
    }

   
    sectionPokemon.classList.remove('hidden');
    sectionPokemon.classList.add("card");

    let btn = document.getElementById("team");
    while (btn.firstChild) {
        btn.removeChild(btn.firstChild);
    }
    const pokemon = await response.json();
    
    
    // update ui with data 
    document.getElementById('img').setAttribute('src', pokemon.sprites.other.dream_world.front_default)
    document.getElementById('name').innerHTML = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    let listAbilities = pokemon.abilities;
  
    let abilities = document.getElementById('abilities');
    abilities.innerHTML = "Abilities: ";
    let count = 0;
    while(count < listAbilities.length){

        abilities.innerHTML += listAbilities[count].ability.name;
        let c = count + 1;
        if(c == listAbilities.length){
            abilities.innerHTML += " ";
        }else{
            abilities.innerHTML += ", ";
        }

        count+=1;
    }

    let type = document.getElementById('type');
    let types = pokemon.types;

    if(types.length == 1){
        type.innerHTML = "Type: ";
    }else{
        type.innerHTML = "Types: ";
    }
 

    count = 0;

    while(count < types.length){

        type.innerHTML += pokemon.types[count].type.name;
        let c = count + 1;
        if(c == types.length){
            type.innerHTML += " ";
        }else{
            type.innerHTML += ", ";
        }

        count+=1;
    }
  

    document.getElementById('weight').innerHTML = `Weight: ${pokemon.weight*0.1} kg` //the weight is in hectograms. 1 hectograma = 100g
    document.getElementById('height').innerHTML = `Height: 0.${pokemon.height} m` //the height is in decimetres. 1 decimetre = 0.1 meter
    document.getElementById("hp").innerHTML = `HP: ${pokemon.stats[0].base_stat}`;
    document.getElementById("atack").innerHTML = `Atack: ${pokemon.stats[1].base_stat}`;
    document.getElementById("defense").innerHTML = `Defense: ${pokemon.stats[2].base_stat}`;
    document.getElementById('exp').innerHTML = `Experience: ${pokemon.base_experience}`;

    
    let addToTeam = document.createElement("button");
    addToTeam.classList.add("button");
    addToTeam.innerHTML = "Add to Team";
    btn.appendChild(addToTeam);
    addToTeam.addEventListener("click", function() {
        toTeam(pokemon);
        addToTeam.innerHTML = "Added to Team";
        addToTeam.classList.add("added");
    });
}

search_btn.addEventListener('click', () => getPokemonData(search_input.value))
 

let list = new listView();
list.fetchUrl(url);

function toTeam(pokemon){
    let pokemonList = [];
    //Check for local storage and add pokemon array
    if(JSON.parse(localStorage.getItem("team")) != undefined) {
        pokemonList = JSON.parse(localStorage.getItem("team"));
    }
    //Move pokemon to array
    pokemonList.push(pokemon)
    //Save array to local storage
    localStorage.setItem("team", JSON.stringify(pokemonList));
}

