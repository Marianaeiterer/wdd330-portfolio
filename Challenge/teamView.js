export default class teamView{

    constructor(pokemonList) {
        this.containerElement = document.getElementById("outputTeam");
        this.list = pokemonList;
    }

    displayTeam(){
        if(this.list == null || this.list == ""){
            this.containerElement.innerHTML = "You don't have any Pokémon in your team";
            this.containerElement.classList.add("text");
            return
        }
        this.list.forEach(pokemon => {
            let card = document.createElement("div");
            this.containerElement.appendChild(card);
            card.classList.add("pokemonCard")
            let img = document.createElement("img")
            img.setAttribute('src', pokemon.sprites.other.dream_world.front_default);
            card.appendChild(img);

            let name = document.createElement("h4")
            name.innerHTML = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            card.appendChild(name);
            let information = document.createElement("p");

            information.innerHTML = `HP: ${pokemon.stats[0].base_stat} <br> Atack: ${pokemon.stats[1].base_stat}  <br> Defense: ${pokemon.stats[2].base_stat}
            <br> Experience: ${pokemon.base_experience}`;

            card.appendChild(information);

            let btn = document.createElement("button");
            btn.innerHTML = "Remove";
            btn.classList.add("remove");
            btn.addEventListener("click", () => {
                this.removeTeam(pokemon);
            });
            card.appendChild(btn);
        });
        
    }

    removeTeam(pokemon){
        //Get pokemon array
        let pokemonList = JSON.parse(localStorage.getItem("team"));
        //Remove pokemon from page    
        event.target.parentElement.remove();

        //Remove pokemon from array
        let index = pokemonList.findIndex(object => {
            return object.name == pokemon.name;
        });
        pokemonList.splice(index, 1);
        //Save new array without the pokemon
        localStorage.setItem("team", JSON.stringify(pokemonList));
        
        if(pokemonList == ""){
            this.containerElement.innerHTML = "You don't have any Pokémon in your team";
            this.containerElement.classList.add("text");
            return
        }
    }
}
