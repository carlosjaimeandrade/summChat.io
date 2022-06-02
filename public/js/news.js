function news(){
    const users = document.querySelectorAll('[data-user]')
    users.forEach(async user=>{
        const name = user.getAttribute('data-user')
        let news = await fetch(`/news/${name}`) 
        news = await news.json()
        if(news.total == 0){
            user.children[0].innerHTML = "";
        }else{
            user.children[0].innerHTML =  `<i class="fa fa-comment-o" aria-hidden="true"></i><span>${news.total}</span>`
        }
    })
}   

  news()

setInterval(()=>{
    news()
},1000)