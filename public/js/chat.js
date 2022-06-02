const socket = io();

async function sendMsg(event) {
    let chat_msg = document.querySelector('[chat-msg]')
    const codigo = event.target.id
    const chat = document.querySelector('.chat')

    await fetch('/msg', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            codigo: codigo,
            msg: chat_msg.value
        })
    });

    socket.emit("message", {
        codigo: codigo,
        msg: chat_msg.value
    })

    chat.insertAdjacentHTML('afterbegin', `<div class="chat-right"><span>${chat_msg.value}</span><div/>`)
    chat_msg.value = ""
}

function typing() {
    const codigo = document.querySelector('[chat-codigo]').id
    socket.emit("typing", {
        codigo
    })
}

socket.on("newMsg", msg => {
    const chat = document.querySelector('.chat')
    chat.insertAdjacentHTML('afterbegin', `<div class="chat-left"><span>${msg}</span><div/>`)
    window.scrollTo(0, document.chat.scrollHeight);
    chat_msg.value = ""
})

let time
socket.on("typing", data=>{
    clearTimeout(time);  
    const typing = document.querySelector('.typing')
    typing.innerHTML = `Digitando...` 
    time = setTimeout(()=>{
        typing.innerHTML = "" 
    },300)  
    
})


