
socket.emit("online", "online")

socket.on("online", online=>{
    online.forEach(on=>{
        console.log(on)
        const user = document.querySelector(`[data-${on.name}]`)
        if(user){
            const status = document.querySelector(`[data-${on.name}]`).children[1].children[1];
            console.log(status)
            status.innerHTML = `<i class="fa fa-circle ${on.status}" aria-hidden="true"></i> ${on.status}` 
        }
    })
})

