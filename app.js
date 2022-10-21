const express = require("express");
const app = express();
const port = 8111;
const oracledb = require('oracledb');



app.use(express.static('public'))


async function run(ID) {

   let connection;
 
   try {
 
     connection = await oracledb.getConnection({ user: "system", 
     password: "system", 
     connectionString: "localhost:1521/xe" });
 
     console.log("Successfully connected to Oracle Database");
 
     // Create a table
 
     await connection.execute(`insert into BILHETE values (${ID},current_timestamp)`); 
 
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




app.listen(port, () => {
  console.log("Servidor Rodando.");
});



app.post('/generate',(req,res) => {
  ID = Math.floor(Math.random() * 100000) + 1;    
  console.log("ID:%i",ID);
  run(ID);
})
