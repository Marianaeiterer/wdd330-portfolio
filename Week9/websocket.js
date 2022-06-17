const URL = 'wss://echo.websocket.events/';
//starts 'wss://' instead of 'https://' This is the secure protocol used by websockets instead of HTTP. 
const outputDiv = document.getElementById('output');
const form = document.forms[0];
const connection = new WebSocket(URL); //stores a reference to our websocket object.

function output(message){
  const para = document.createElement('p');
  para.innerHTML = message;
  outputDiv.appendChild(para);
}
//WebSocket(URL) runs and creates an instance of a WebSocket object and tries to connect to the URL
//If it is successful, it fires an event called 'open'. 
connection.addEventListener('open', () => {
    output('CONNECTED');
}, false);


  

form.addEventListener('submit', message, false);


function message(event) {
    event.preventDefault();
    const text = form.message.value;
    output(`SENT: ${text}`)
    connection.send(text);
} 
//calls a method of the connection object called send()
//This sends the message to the URL that the websocket is connected to, the message is received,
//and the server will process it and send a response. 
//The connection object waits for the response, and when it receives one, a 'message' event is fired. 


//event handler to deal with the response
connection.addEventListener('message', (event) => {
    output(`RESPONSE: ${event.data}`);
}, false);



