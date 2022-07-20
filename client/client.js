let socket = io.connect();
let userName = prompt('What is your user name?');
let isUsernameSet = false;
/*let userName = '';


if (isUsernameSet = false) {
    displayLoginPage();
    //isUsernameSet = true;
}*/
socket.emit('setUserName', userName);
let inputElement = document.getElementById('message');

//event listener for send to all
document.getElementById('sendToAll').addEventListener('click', () => {
    let message = inputElement.value;
    //console.log(message);
    socket.emit('sendToAll', (message));
    inputElement.value = '';
});
document.getElementById('sendPrivate').addEventListener('click', () => {
    let message = inputElement.value;
    socket.emit('sendToMe', (message));
    inputElement.value = '';
});
const target = document.getElementById('messageTarget');

//socket functions
socket.on('displayMessage', (message) => {
    target.innerHTML += '<br>' + message;
});
socket.on('displayUsers', usersArr => {
    displayUsers(usersArr);
    console.log(usersArr)
});

//my functions
const displayLoginPage = () => {

}
const displayUsers = (arr) => {
    console.log(arr)
    let userElement = document.getElementById('displayUsers');
    userElement.innerHTML = ''
    arr.forEach((user) => {
        if (user === userName) {
            // console.log(user + ' ' + userName);
            userElement.innerHTML += 'You' + ', ';
        } else {
            userElement.innerHTML += user + ', ';
        }

    });
}