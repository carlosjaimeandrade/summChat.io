function insertMsg(msg, position,icon){
    const chat = document.querySelector('.chat')
    const now = new Date()

    const element = `
    <div class="chat-${position}">
    ${icon == true ? `<div class="view"><i class="fa fa-circle-thin" aria-hidden="true"></i></div>` : ""}
    <span class="msg-area">
        ${msg}
        <span class="msg-hr">${now.toLocaleString()}</span> 
    </span>
    <div/>`

    chat.insertAdjacentHTML('afterbegin', element)
}

async function sendMsg(event) {
    let chat_msg = document.querySelector('[chat-msg]')
    const codigo = event.target.id

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

    insertMsg(chat_msg.value,"right", true)

    chat_msg.value = ""
}

function typing() {
    const codigo = document.querySelector('[chat-codigo]').id
    socket.emit("typing", {
        codigo
    })
}

socket.on("newMsg", data => {
  
    insertMsg(data.msg,"left", false)

    socket.emit("viewMsg", data)
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

socket.on("viewMsg", async data=>{
    const views = document.querySelectorAll('.fa-circle-thin')
    views.forEach(view=>{
        view.classList.remove('fa-circle-thin')
        view.classList.add('fa-check-circle')
        view.classList.add('view-ok')
    })

})

const codigo = document.querySelector("[chat-codigo]").id
socket.emit("viewMsg",{ codigo:codigo})

