let socket = io.connect();
let inputElement = document.getElementById('message');
document.getElementById('sendToAll').addEventListener('click',  ()=>{
    let message = inputElement.value;
    console.log(message);
    socket.emit('sendToAll', message);
    inputElement.value = '';
});

const target = document.getElementById('messageTarget');

socket.on('displayMessage', (message) => {
    target.innerHTML += '<br>'+message;
});