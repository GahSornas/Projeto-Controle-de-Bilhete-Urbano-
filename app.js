import express  from "express";
import oracledb from 'oracledb';
import bodyParser  from 'body-parser';
import path from 'path';

const __dirname = path.resolve(path.dirname(''));
const app = express();
const port = 8111;
//import {seeID} from "./dbInsert.js";


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

// function printData()
// {
  
//   async function getDatabyID(ID){
//     try{
//       await connection.execute(`select * from BILHETE where id=${ID}`)
//     }catch (err){
//       console.log(err)
//     }
//   }
  
// }



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

app.get("/seeID",(req,res)=>{
  console.log(req)
  getDatabyID(req.params.ID)
  
})


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
