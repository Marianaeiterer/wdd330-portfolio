
//prevents the default behavior of the form, so it doesn't get submitted when the Add Task button is clicked. 
const form = document.forms['todo'];
form.addEventListener('submit', addTask, false); 

function addTask(event) {
    event.preventDefault();
    const number = form.task.value;
    const task = {
        userId: 1,
        title: form.task.value,
        completed: false
    }
    const data = JSON.stringify(task);
    const url = 'https://jsonplaceholder.typicode.com/todos';


    //we build the Headers and Request objects
    const headers = new Headers({
        'Accept': 'application/json', //Because we are sending JSON
        'Content-Type': 'application/json' //Because we are sending JSON
    });
    const request = new Request(url,
    {
        method: 'POST', //Because we are sending data we use POST
        header: headers,
        body: data //this is where the data we want to send is placed. We use data so the JSON is sent to the server
    }
    )

    //Then we use the fetch() method to send the request and deal with the response
    fetch(request)
    .then( response => response.json() )
    .then( task => console.log(`Task saved with an id of ${task.id}`) )
    .catch( error => console.log('There was an error:', error))

}