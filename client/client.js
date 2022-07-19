let socket = io.connect();


let inputElement = document.getElementById('message');

//event listener for send to all
document.getElementById('sendToAll').addEventListener('click',  ()=>{
    let message = inputElement.value;
    console.log(message);
    socket.emit('sendToAll', message);
    inputElement.value = '';
});
document.getElementById('sendPrivate').addEventListener('click' , ()=>{
    let message = inputElement.value;
    socket.emit('sendToMe', message);
    inputElement.value='';
});
const target = document.getElementById('messageTarget');

socket.on('displayMessage', (message) => {
    target.innerHTML += '<br>'+message;
});