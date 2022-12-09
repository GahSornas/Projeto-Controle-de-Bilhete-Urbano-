const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require(__dirname + "/dbActions.js");
const morgan = require('morgan')


const dbCredentials = {
  user: "PI",
  password: "123456",
  connectString: "localhost:1521/xe",
};


app.use(morgan('dev'))

app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded());

function generateID() {
  ID = Math.floor(Math.random() * 100000) + 1;
  console.log("new ID");
  return ID;
}

//Rotas//
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/home.html");
});
app.get("/Gerar", (req, res) => {
  res.sendFile(__dirname + "/public/html/indexGerar.html");
});
app.get("/Recarga", (req, res) => {
  res.sendFile(__dirname + "/public/html/indexRecarga.html");
});
app.get("/Utilizar", (req, res) => {
  res.sendFile(__dirname + "/public/html/indexUtilizar.html");
});
app.get("/Relatorio", (req, res) => {
  res.sendFile(__dirname + "/public/html/indexRelatorio.html");
});

app.listen(port, () => {
  console.log("Servidor Rodando.");
  console.log(`127.0.0.1:${port}`);
});

app.post("/generate", async (req, res) => {
  ID = await db.run(dbCredentials);
  res.send({
    id: ID,
    message: "id criado",
  });
  res = {
    id: ID,
    message: "id criado",
  };
  console.log("RES:");
  console.log(res);
});

//Recarga

app.post("/recharge", async (req, res) => {
  var id = req.body.id;
  var kindID = req.body.kindID;
  var credits = req.body.credits
  await db.insertRecarga(dbCredentials, id, kindID,credits);
  //console.log(`insert into recarga values (${id_generated},current_timestamp,${id},'${kindID}');`)

  res.status(200).send({
    message: "id received",
    id: id,
    kindID: kindID,
    credits : credits
  });
  res = {
    message: "recarga feita",
    id: id,
    kindID: kindID,
  };
});

app.post("/utilize", async (req, res) => {
  let id = req.body.id;
  recarga = await db.seeUtilize(dbCredentials, id);
  //console.log(recarga);
  // if(recarga[1]==0)
  // {
  //   console.log("empty array")
  // }


  let avalibleIds = recarga[0];
  let activeIDS = recarga[1];
 
   console.log(avalibleIds);
   console.log(activeIDS)
  
  for(let i in avalibleIds)
  {
    for(let j in activeIDS)
    {
      if(avalibleIds[i][0] === activeIDS[j][0])
      {
        avalibleIds.splice(i,1);
      }
    }
  }
  
  for(let i in activeIDS)
  {
    
    // "2022-12-07T21:30:02.9281Z" //node.js
    // "09-DEC-22 12.31.25.242000000 AM -03:00" //oracle db
    let d =  activeIDS[i][2]
    console.log(d)
    d = new Date(toString(activeIDS[i][2]));
    console.log(d)
  }

  res.send({
    avalibleIds: avalibleIds,
    activeIDS : activeIDS
  });

  // res = {
  //   avalibleIds: avalibleIds,
  //   activeIDS : activeIDS
  // };
    res = {
      "message" :"uwu"
    }

});

app.post("/teste", (req, res) => {
  console.log(req.body);
  res.send({
    id: "r23r23",
    message: "id criado",
  });
  res = {
    id: "r23r23",
    message: "id criado",
  };
});
