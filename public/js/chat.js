const socket = io();

async function sendMsg(event){
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
    
    socket.emit("message",{
        codigo:codigo,
        msg: chat_msg.value
    })
  
    chat.insertAdjacentHTML('afterbegin', `<div class="chat-right"><span>${chat_msg.value}</span><div/>`)
    chat_msg.value = ""
}


socket.on("newMsg", msg=>{
    console.log(msg)
    const chat = document.querySelector('.chat')
    chat.insertAdjacentHTML('afterbegin', `<div class="chat-left"><span>${msg}</span><div/>`)
    chat_msg.value = ""
})