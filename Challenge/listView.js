/*Get HTML output list*/
const outputDiv = document.getElementById('output');


export default class listView{
    constructor() {
        this.containerElement = outputDiv;
    }

    displayList(data) {

        for(let i = 0; i < data.results.length; i++) {
    
            /*Simple view*/
            let line = document.createElement("div");
            line.classList.add(`div${i}`);
            line.innerHTML =
            `<p>${data.results[i].name.charAt(0).toUpperCase() + data.results[i].name.slice(1)} </p> `
            this.containerElement.appendChild(line);
        }
       
        this.pages(data);
    }

    pages(data, url) {
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
                this.resetpage()
            
                /*Set new page url*/
                url = data.previous
                /*Get data and build new page*/
                this.fetchUrl(url)
            })
        }
    
    
        if(data.next != null) {
            let nextButton = document.createElement('button')
            nextButton.innerHTML = "Next";
            buttons.appendChild(nextButton)
            nextButton.classList.add("btn")
            nextButton.addEventListener('click', () => {
                this.resetpage()
                console.log(data.next);
                url = data.next
                this.fetchUrl(url)
            })
        }
        this.containerElement.appendChild(buttons);
    }

    resetpage() {
        while (this.containerElement.firstChild) {
            this.containerElement.removeChild(outputDiv.firstChild);
        }
    }


    /*Fetch to get the list*/
    fetchUrl(url) {
      
        fetch(url)
        .then( response => response.json())
        .then( data => {
            this.displayList(data);
        });
    }

}
