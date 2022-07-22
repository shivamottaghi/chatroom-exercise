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
    let parent = document.getElementById('displayUserUl');
    parent.innerHTML = ''

    arr.forEach((user) => {
        let child = generateOnlineUserStructure(user);
        parent.appendChild(child);
    });
}
const generateOnlineUserStructure = (user) => {
    let li = createEl('li', 'p-2 border-bottom');
    let flexDiv = createEl('div', 'd-flex flex-row');
    let img = createEl('img', 'rounded-circle d-flex align-self-center me-3 shadow-1-strong');
    img.width = '60';
    img.src = 'images/user-icon-png-pnglogocom-133466.png';
    let nameDiv = createEl('div', 'pt-1');
    let namePar = createEl('p', "fw-bold mb-0");
    //let timeDiv = createEl('div', 'pt-1');
    //let timePar = createEl('p', 'small text-muted mb-1');
    if (user === userName) {
        namePar.innerHTML = 'You';
    } else {
        namePar.innerHTML = user;
    }
    nameDiv.appendChild(namePar);
    flexDiv.appendChild(img);
    flexDiv.appendChild(nameDiv);
    li.appendChild(flexDiv);
    return li;
}
const createEl = (element, className) => {
    let el = document.createElement(element);
    el.setAttribute('class', className);
    return el;
}
const displayMessage = (userMessage) => {
    const target = document.getElementById('messageTarget');
    //console.log(userMessage[0]);
    if (userMessage[0] == userName) {
        userMessage[0] = 'You';
    }
    target.innerHTML += '<br>' + userMessage[0] + " said: " + userMessage[1];
}


let socket = io.connect();

let isUsernameSet = false;
let userName = '';
displayLogin();


//*****************************event listeners
document.getElementById('sendToAll').addEventListener('click', () => {
    let inputElement = document.getElementById('message');
    let message = inputElement.value;
    //console.log(message);
    socket.emit('sendToAll', (message));
    inputElement.value = '';
});
document.getElementById('sendPrivate').addEventListener('click', () => {
    let inputElement = document.getElementById('message');
    let message = inputElement.value;
    socket.emit('sendToMe', (message));
    inputElement.value = '';
});
document.getElementById('login').addEventListener('click', () => {
    userName = document.getElementById('username').value;
    socket.emit('setUserName', userName);
    isUsernameSet = true;
    displayChatBox();
});
//*****************************socket functions

socket.on('displayMessage', (userMessage) => {
    displayMessage(userMessage)
});
socket.on('displayUsers', usersArr => {
    displayUsers(usersArr);
    console.log(usersArr)
});

