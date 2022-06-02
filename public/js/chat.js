async function sendMsg(event){

    let chat_msg = document.querySelector('[chat-msg]')
    const codigo = event.target.id
    const chat = document.querySelector('.chat')

    const rawResponse = await fetch('/msg', {
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
    
    chat.insertAdjacentHTML('afterbegin', `<div class="chat-right"><span>${chat_msg.value}</span><div/>`)
    chat_msg.value = ""
}

async function updateChat(){
    const chat = document.querySelector('.chat')
    const offset = chat.children.length
    const codigo = document.querySelector('.chat-send').children[1].id

    let msgs = await fetch(`/msgs/${offset}/${codigo}`)
    chatMsgs = await msgs.json()

    chatMsgs.msgs.forEach(msg=>{
        chat.insertAdjacentHTML('afterbegin', `<div ${msg.userId == chatMsgs.id ? "class=chat-right" : "class=chat-left"} ><span>${msg.msg}</span><div/>`)
    })
}

setInterval(()=>{
    updateChat()
},500)