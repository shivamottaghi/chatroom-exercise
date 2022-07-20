//*****************************my functions
const displayLogin = () => {
    let loginRow = document.getElementById('loginRow');
    loginRow.classList.remove('d-none');
}

const displayChatBox = () => {
    let chatBoxRow = document.getElementById('chatBoxRow')
    chatBoxRow.classList.remove('d-none');
    let loginRow = document.getElementById('loginRow');
    loginRow.classList.add('d-none');
    let displayUsers = document.getElementById('displayUsers');
    displayUsers.classList.remove('d-none')

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



let socket = io.connect();
//let userName = prompt('What is your user name?');
let isUsernameSet = false;
let userName = '';
displayLogin();

/*if (isUsernameSet = false) {*/
/*    //isUsernameSet = true;
}*/
socket.emit('setUserName', userName);
let inputElement = document.getElementById('message');

//*****************************event listeners
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
document.getElementById('login').addEventListener('click', ()=>{
     userName = document.getElementById('username').value;
     isUsernameSet = true;
     displayChatBox();
});
//*****************************socket functions
const target = document.getElementById('messageTarget');
socket.on('displayMessage', (message) => {
    target.innerHTML += '<br>' + message;
});
socket.on('displayUsers', usersArr => {
    displayUsers(usersArr);
    console.log(usersArr)
});

