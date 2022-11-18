const express = require("express");
const app = express();
const port = 8111;
const oracledb = require('oracledb');
const bodyParser = require('body-parser')


const dbCredentials = {
    user: 'PI',
    password: '123456',
    connectString: 'localhost:1521/xe'
}



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())
app.use(express.urlencoded());


app.use(express.static('public'))

function generateID(){
  ID = Math.floor(Math.random() * 100000) + 1;
  console.log("new ID");
  return ID;
}


async function seeID(dbConfig,ID) {

  let connection;

  try {
    // Get a non-pooled connection

    connection = await oracledb.getConnection(dbConfig);


    const result = await connection.execute(
      // The statement to execute
      `SELECT * from bilhete where id_bilhete = ${ID}`,
      );
    
    return [result.rows[0][0],result.rows[0][1]];
    

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}


async function insertRecarga(dbConfig,id_recarga,ID,kindID) {

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(`insert into RECARGA values (${id_recarga},current_timestamp,${ID},${kindID});`);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}



async function run(ID) {

   let connection;
 
   try {
     connection = await oracledb.getConnection(dbCredentials);
 
     console.log("Successfully connected to Oracle Database");
      /*TESTE*///ID = 1;

    async function insertDB(ID){
      try{
        await connection.execute(`insert into BILHETE values (${ID},current_timestamp)`);
      }catch (err){
        console.log(err);
        ID = generateID();
        insertDB(ID)
      } 
    }

    console.log(ID);
    insertDB(ID);
     // Insert some data


     connection.commit();

 
   } catch (err) {
     console.error(err);
   } finally {
     if (connection) {
       try {
         await connection.close();
        } catch (err) {
         console.error(err);
       }
     }
   }
 }




app.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

app.get("/Gerar_bilhete",(req,res) => {
  res.sendFile(__dirname + '/public/indexGerar.html')
})
app.get("/Recarga",(req,res) => {
  res.sendFile(__dirname + '/public/indexRecarga.html')
})
app.get("/Relatorio",(req,res) => {
  res.sendFile(__dirname + '/public/indexRelatorio.html')
})
app.get("/Utilizar",(req,res) => {
  res.sendFile(__dirname + '/public/indexUtilizar.html')
})

// app.get("/seeID",(req,res)=>{
//   console.log(req)
//   getDatabyID(req.params.ID)
  
// })


app.listen(port, () => {
  console.log("Servidor Rodando.");
});


app.post('/generate',(req,res) => {
  ID = generateID();
  console.log("ID:%i",ID);
  run(ID);
  res.send({
    id : ID,
    message: "id criado"
  })
  res = {
    id : ID,
    message: "id criado"
  }
  console.log("RES:")
  console.log(res)
})


app.post('/recharge',(req,res) => {
  var id = req.body.id;
  var kindID = req.body.kindID;
  result = insertRecarga(dbCredentials,id_recarga,id,kindID)
  .then
  res.status(200).send({
    message: "id received",
    id : id
  })

})


app.post('/teste',(req,res) => {

  res.send({
    id : "r23r23",
    message: "id criado"
  })
  res = {
    id : "r23r23",
    message: "id criado"
  }
  console.log(res)
})


seeID(dbCredentials,20314)
.then(res => console.log(res))