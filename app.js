const express = require("express");
const app = express();
const port = 8111;


app.use(express.static('public'))


app.get("/", (req, res) => {
  res.sendFile(__dirname + '/indexGerar.html')
});


app.listen(port, () => {
  console.log("Servidor Rodando.");
});

app.post('/generate',(req,res) => {
  ID = Math.floor(Math.random() * 10000) + 1;    
  console.log("ID:%i",ID);
})
