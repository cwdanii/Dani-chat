const socket = io('http://localhost:8000');

const form = document.getElementById('send-form');
const messageinput = document.getElementById('messageinp');
const messagecontainer = document.querySelector(".container");
const audio = new Audio('../ting.mp3'); 

const append = (message, position)=> {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')  
    messageElement.classList.add(position)
    messagecontainer.append(messageElement)
    if(position == 'left' ){
        audio.play();
    }
    // if(position == 'centre'){
    //     audio.play();
    // }
} 

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageinput.value;
    append(`You: ${message}`, "right");
    socket.emit('send', message);
    messageinput.value = "";
})

const name = prompt('Enter Your name', "unknown")
socket.emit('new-user-joined', name)

socket.on('user-joined', name =>{
    append(`${name}, joined the chat`,'centrejoin' )
})

socket.on('recieve', data =>{
    append(`${data.name}: ${data.message}`,'left' )
})

socket.on('leave', name =>{
    append(`${name}, leave the chat`,'centreleave' )
})