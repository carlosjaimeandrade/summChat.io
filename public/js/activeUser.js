const select = document.querySelector('[data-select]') 
const active = select.getAttribute('data-select')
const hover = document.querySelector(`[data-${active}]`)
hover.classList.add("user-active")