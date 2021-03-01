const io = require('socket.io-client');
const url = "http://localhost:3000";
const name = 'Spam Bot';

const minDelay = 10000;
const maxDelay = 120000;
const messageLen = 10;

function reverseString(str) {
    return str.split("").reverse().join("");
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = characters.length;
function randomStr(length) {
    let result = '';

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

let contacts = [];

let socket = io(url, {
    reconnection: true
});
socket.on('disconnect', () => {
    console.log(this.socket.id);
});
socket.on('connect', () => {
    console.log('Socket connected');
    socket.emit('users', name, ({users,_}) => {
        contacts = users;
    });
});

socket.on('users', ({users,_}) => {
    contacts = users;
})

socket.on('connect_error', i => {
    console.log(i);
});

const sleep = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}  

(async () => {
    while(true) {
        const timeout = getRandomIntInclusive(minDelay,maxDelay);
        console.log('timeout '+timeout);
        await sleep(timeout);
        contacts.forEach(user => {
            const u = user.name;
            if(u == null){
                console.log('u: '+u)
                return;
            }
            if(!u.includes('Bot')) {
                const message = {author:name, recipient:u, timestamp:Date.now(), text:randomStr(messageLen)}
                socket.emit('message',message);
            }
        })
    }
}) ()


