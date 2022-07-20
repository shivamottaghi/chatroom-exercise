let socket = io.connect();

let userName = prompt('What is your user name?');
let inputElement = document.getElementById('message');

//event listener for send to all
document.getElementById('sendToAll').addEventListener('click',  ()=>{
    let message = inputElement.value;
    //console.log(message);
    socket.emit('sendToAll', (userName + " : " + message));
    inputElement.value = '';
});
document.getElementById('sendPrivate').addEventListener('click' , ()=>{
    let message = inputElement.value;
    socket.emit('sendToMe', (userName + " : " + message));
    inputElement.value='';
});
const target = document.getElementById('messageTarget');

socket.on('displayMessage', (message) => {
    target.innerHTML += '<br>' + message;
});