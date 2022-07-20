import teamView from "./teamView.js";

let pokemonList = [];
    pokemonList = JSON.parse(localStorage.getItem("team"));


function getTeam() {

    const list = localStorage.length;
    
    pokemonList = JSON.parse(localStorage.getItem("team"));

}

getTeam();

let view = new teamView(pokemonList);
view.displayTeam();

