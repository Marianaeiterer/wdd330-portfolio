const search_input = document.getElementById('search');
const search_btn = document.getElementById('search_btn');

/*Get HTML output list*/
const outputDiv = document.getElementById('output');

/*Get API URL*/
let url = "https://pokeapi.co/api/v2/pokemon";



// api https://pokeapi.co/docs/v2#pokemon
async function getPokemonData(inputValue){
    //document.getElementById('show_error').classList.remove('show')
    //document.getElementById('show_error').classList.add('hidden')

    let btn = document.getElementById("team");
    while (btn.firstChild) {
        btn.removeChild(btn.firstChild);
    }
    
    const sectionPokemon = document.getElementById("pokemon");
    sectionPokemon.classList.add("card");
    const url = `https://pokeapi.co/api/v2/pokemon/${inputValue.toLowerCase()}`
    const response = await fetch(url)

  //  if(response.status == 404 || response.statusText == 'Not Found'){
    //    document.getElementById('show_error').classList.add('show')
      //  document.getElementById('show_error').classList.remove('hidden')
        //return
    //}

    const pokemon = await response.json()
    

    console.log(pokemon)
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
    console.log(types.length)
    
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
}

search_btn.addEventListener('click', () => getPokemonData(search_input.value))
    
/*Fetch to get the list*/
function fetchUrl(url) {
    fetch(url)
    .then( response => response.json())
    .then( data => {
        displayList(data);
    })
}

fetchUrl(url);

/*Displays page from data*/
function displayList(data, url) {

    console.log(data.next);
    for(i = 0; i < data.results.length; i++) {

        /*Simple view*/
        let line = document.createElement("div");
        line.classList.add(`div${i}`);
        line.innerHTML =
        `<p>${data.results[i].name.charAt(0).toUpperCase() + data.results[i].name.slice(1)} </p> `
        outputDiv.appendChild(line);
    }
    
    pages(data)
    
}

/*Creates page buttons*/
function pages(data, url) {
    /*Creates section for buttons*/
    let buttons = document.createElement('section')
    buttons.setAttribute('id','buttons')

    /*Check if previous page exists, else create previous button*/
    if(data.previous != null) {
        let prevButton = document.createElement('button')
        prevButton.classList.add("btn")
        prevButton.innerHTML = "Previous"
        buttons.appendChild(prevButton)

        prevButton.addEventListener('click', () => {
            /*Remove last page*/
            resetpage()
        
            /*Set new page url*/
            url = data.previous
            /*Get data and build new page*/
            fetchUrl(url)
        })
    }


    if(data.next != null) {
        let nextButton = document.createElement('button')
        nextButton.innerHTML = "Next";
        buttons.appendChild(nextButton)
        nextButton.classList.add("btn")
        nextButton.addEventListener('click', () => {
            resetpage()
            console.log(data.next);
            url = data.next
            fetchUrl(url)
        })
    }
    outputDiv.appendChild(buttons)
}


function resetpage() {
    while (outputDiv.firstChild) {
        outputDiv.removeChild(outputDiv.firstChild);
    }
}
