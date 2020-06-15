//configuração banco de dados

//importar a dependencia do sqlite3
//verbose() configura avisando que deseja ver mensagens no terminal sempre que acontecer algo
const sqlite3 = require("sqlite3").verbose()



//criar o objeto de banco de dados(operacoes)
const db = new sqlite3.Database("./src/database/dataabse.db")

//Exportando o objeto db.js para ser acesasdo em outro local
module.exports = db 


// utilizar o objeto de banco de dados para nossas operações
//serialize() server rodar uma sequencia de codigo
 db.serialize( () =>{
    
     // 1 - criar uma tabela com comandos sql
     //usar as crases para dar a quebra de linha
   
    //  db.run(`
    //      CREATE TABLE IF NOT EXISTS places (
    //          id INTEGER PRIMARY KEY AUTOINCREMENT,
    //          image TEXT,
    //          name TEXT,
    //          address TEXT,
    //          address2 TEXT,
    //          state TEXT,
    //          city TEXT,
    //          items TEXT
    //      );
    //  `)

    
     // 2 - inserir dados na tabela
     
    //  const query = `
    //      INSERT INTO places (
    //              image,
    //              name,
    //              address,
    //              address2,
    //              state,
    //              city,
    //              items
    //          ) VALUES (?,?,?,?,?,?,?);
    //  `
    //  const values =[
    //      "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
    //      "Colectoria",
    //      "Guilherme Gemballa, Jardim América",
    //      "Nº 260",
    //      "Santa Catarina",
    //      "Rio do Sul",
    //        "Resíduos Eletronicos, Lâmpadas"
        
    //  ]
    
    //  function afterInsertDate(err) {
    //      if(err){
    //          return console.log(err)
    //      }
    //      console.log("Cadastrado com sucesso")
    //      console.log(this)

    //  }

    //  db.run(query, values, afterInsertDate)

     // 3 - consultar dados da tabela
     
    //   db.all(`SELECT * FROM places`, function(err, rows){
    
    //       if(err){
    //           return console.log(err)
    //       }
    //       console.log("Aqui estão seus registros")
    //       console.log(rows)

    //   })
    

     // 4 - deletar um dado da tabela

    //    db.run(`DELETE FROM places WHERE id = ?`, [4], function (err){

    //       if(err){
    //            return console.log(err)
    //        }
    //        console.log("Registro deletado com sucesso")
    //        console.log(rows)

    //    })
 }) 






