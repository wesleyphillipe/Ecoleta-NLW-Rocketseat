//criação do servidor com utilização de módulos extras

//Usando o express instalado aqui
const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db.js")

// configurar a pasta public
server.use(express.static("public"))


//habilitar o uso do req.body na nossa apliação. Muito usado para envio de formularios
server.use(express.urlencoded({extended: true}))

//utilizando tempalte engine
// .configure()//pastas aonde estao os hmls que irao utilizar
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express: server, //servidor
    noCache: true        //não existe cache
}) 


//configurar caminhos da minha aplicação
//pagina inicial
// req: requisição / pedido
//res: resposta
server.get("/", function(req, res){
   return res.render("index.html", {title: "Um Título"}) //envia a resposta 
})

server.get("/create-point", function(req, res){

   //req.query pega a inforamção ja passada no statement na barra de nagegação. Aonde já esta "gravando"
   // São Query Strings da nossa url
   //console.log (req.query);

   return res.render("create-point.html") //envia a resposta 
})

server.post("/savepoint",(req,res) =>{
   
   //req.body: o corpo do nosso formulario
   //console.log(req.body)
   
   // inserindo os dados no banco de dados

     const query = `
          INSERT INTO places (
                  image,
                  name,
                  address,
                  address2,
                  state,
                  city,
                  items
              ) VALUES (?,?,?,?,?,?,?);
      `
      const values =[
          req.body.image,
          req.body.name,
          req.body.address,
          req.body.address2,
          req.body.state,
          req.body.city,
          req.body.items
      ]
    
      function afterInsertDate(err) {
          if(err){
                console.log(err)
                return res.send("Erro no cadastro!") //tratamento de um erro
          }
          console.log("Cadastrado com sucesso")
          console.log(this)

          return res.render("create-point.html", {saved: true})

      }

      db.run(query, values, afterInsertDate)

})



server.get("/search", function(req, res){

    const search = req.query.search

    if(search == "")
    {
        //pesquisa vazia
        //mostrar a pagina html com os dados do banco de dados
        return res.render("search-results.html", { total: 0}) //envia a resposta 

    }
 

   //pegar os dados do banco de dados
   //USANDO AS ASPAS PODE VIR O QUE VEIO ANTES OU DEPOIS DO QUE FOI DIGITADO NO CAMPO
   db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
      
         if(err){
            return console.log(err)
         }

         const total = rows.length
         
        //mostrar a pagina html com os dados do banco de dados
        return res.render("search-results.html", {places: rows, total: total}) //envia a resposta 

   })
})
    

//ligar o servidor em uma porta
server.listen(3000)
