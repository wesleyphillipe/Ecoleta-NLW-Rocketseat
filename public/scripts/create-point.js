//console.log("Hello") //funcionalidade de escrever texto


function populateUFs(){ 
    const ufSelect = document.querySelector("select[name=uf]")

    //faz a chamado no link e espera receber uma promessa com os estados no site do ibge
    fetch ("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() ) //funçao anonima que está retornando um valor json
    .then( states => {

        for( const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
        

    })
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value //ao mudar o value, que é o estado, irá udar a url que agora está dinamica

    const indxOfSelectState = event.target.selectedIndex
    stateInput.value= event.target.options[indxOfSelectState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    //limpando o option para selecionar outra cidade
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>" 
    citySelect.disabled = true  

    fetch (url)
    .then( res => res.json() ) //funçao anonima que está retornando um valor json
    .then( cities => {

        
        for( const city of cities){
            //obs: desta forma o city.nome irá salvar no banco de dado o nome da cidade.
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        
        citySelect.disabled = false
    }) 

}

//Ouvidor de eventos para chamar um elemento
document.querySelector("select[name=uf]")
.addEventListener("change",getCities)

// Itens de Coleta

//Pegar todos os li
//Ouvidor de eventos para chamar VARIOS elementos, utiliza o querySelectorAll 
const itensToCollect = document.querySelectorAll(".itens-grid li")

for (const item of itensToCollect){

    item.addEventListener("click", handleSelectedItem) 
}

const collectedItens = document.querySelector("input[name=items]")

let selectedItens = []

function handleSelectedItem (event){

    const itemLi = event.target /*event.taget é o vento que está sendo tratado neste caso é o li*/
    
    //Adicionar ou remover uma classe com javascript
    //O toggle faz a função de adicionar ou remover. 
    //Ou seja, ele esta fazendo o seguinte, ao clicar no li ele verifica se tem a classe select. Se não tem, ele adiciona. Se tem ele remove.
    itemLi.classList.toggle("selected")
    

    const itemId = itemLi.dataset.id

    //verificar se existe itens selecionado, tendo, pegar os itens selecionados
    //pegar os itens selecionados

    //findIndex, procura em um array se tem um index preenchido. Se não tem ele add
    const alreadySelected = selectedItens.findIndex( item => {
        const itemFound = item == itemId //será verdadeiro ou falso
        return itemFound
    })

    //se estiver selecionado remover da seleção

    if(alreadySelected >=0){
        const filteredItems = selectedItens.filter( item =>{
            const itemIsDifferent = item !=itemId  
            return itemIsDifferent
        })

        selectedItens = filteredItems 
    } else{ 
        
        //se nao estiver selcionado, add a seleção
        selectedItens.push(itemId)
    }
    
    //atualizar o campo escondido com os dados selecionados
    collectedItens.value = selectedItens

}

