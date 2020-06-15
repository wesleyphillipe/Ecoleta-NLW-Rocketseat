const buttonSearch = document.querySelector("#page-home main a") //procurando aonde está localizado o elemento button
const modal = document.querySelector("#modal") //procurando aonde está localizado o elemento modal
const close = document.querySelector("#modal .header a") //procurando aonde está localizado o elemento FECHAR


buttonSearch.addEventListener("click", () => {
    
    modal.classList.remove("hide") //removendo a classe hide do modal. Ou seja Abriu o modal

} )

close.addEventListener("click", () =>{
    modal.classList.add("hide") //adicionou a classe hide do modal. Ou seja fechou o modal
})