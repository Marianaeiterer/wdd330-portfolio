var count = 1;

function touch(element) {

    if (element.innerHTML == "") {
        if (count == 10) {
            event.preventDefault();
        } else if (count % 2 == 0) {
            element.innerHTML = "O";
        } else if (count % 2 == 1) {
            element.innerHTML = "X";
        }
        count++;
        rules();
    } else {
        event.preventDefault();
        rules();
    }

    rules();
}

function resetBoard() {
    var cell = document.getElementsByClassName("cell");
    for (var i = 0; i < cell.length; i++) {
        cell[i].innerHTML = "";
    }

    document.getElementById("winner").innerHTML = "";
}

function whoWons() {
    const category = document.querySelector('.container');
    const links = Array.from(category.querySelectorAll('.cell'));
    const de = links.map(link => link.textContent)
    console.log(de);
    for(var i=0; i < de.length; i++){
        if(de[i] == de[i++]){
            document.getElementById("winner").innerHTML = "win";
        }
    }

}

function rules(){
    const board_filled=document.getElementsByClassName("cell");
    let tie=false;
    for (let i = 0; i < board_filled.length; i++) {
        if(board_filled[i].innerHTML.length == 0 ){
           tie=false;
           break;
        }else{
            tie=true;
        }
    }
    if(tie==true){
        document.getElementById("winner").innerHTML = "It's a tie!"
        event.preventDefault();
    }
}