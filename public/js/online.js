
socket.emit("online", "online")

socket.on("online", online=>{
    online.forEach(on=>{
        const user = document.querySelector(`[data-${on.name}]`)
        if(user){
            const status = document.querySelector(`[data-${on.name}]`).children[1].children[1];
            status.innerHTML = `<i class="fa fa-circle ${on.status}" aria-hidden="true"></i> ${on.status}` 
        }
    })
})

