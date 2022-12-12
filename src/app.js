const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require(__dirname + "/dbActions.js");
const morgan = require('morgan');
const moment = require('moment'); // require


moment().format(); 

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

});

//Recarga

app.post("/recharge", async (req, res) => {
  var id = req.body.id;
  var kindID = req.body.kindID;
  var credits = req.body.credits
  await db.insertRecarga(dbCredentials, id, kindID,credits);

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


app.post("/utilizeID",async (req,res) => {
  let FK_RECARGA_id_recarga = req.body.FK_RECARGA_id_recarga;
  db.insertUtilize(dbCredentials,FK_RECARGA_id_recarga);
  res ={
    message : "utlização feita"
  }
})







app.post("/utilize", async (req, res) => {
  let id = req.body.id;
  let recarga = await db.seeUtilize(dbCredentials, id);

  let avalibleIds = recarga[0];
  let activeIDS = recarga[1];
  let currentTime = recarga[2][0][0];

 
  try{
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
  }catch(err){
    console.log(err)
  }


  try{
    for(let i  in activeIDS)
    {
      //console.log(activeIDS[i])
      for(let j in activeIDS)
      {
        if((activeIDS[i][0] === activeIDS[j][0]) && i!==j)
        {
          console.log(activeIDS[i]);
          console.log(activeIDS[j]);
          activeIDS.splice(i,1);
        }
      }
    }
    for(let i  in activeIDS)
    {
      for(let j in activeIDS)
      {
        if((activeIDS[i][0] === activeIDS[j][0]) && i!==j)
        {
          console.log(activeIDS[i]);
          console.log(activeIDS[j]);
          activeIDS.splice(i,1);
        }
      }
    }
  }catch{

  }


  currentTime = new Date(currentTime)
  for(let i in activeIDS)
  {
      let test1 = "1/1/2023"
      test1 = moment(test1)
      currentTime = moment(currentTime)
      let timeID = new Date(activeIDS[i][2]);
      timeID = moment(timeID);
      // console.log("Difereça de tempo")
      // console.log(currentTime.diff(timeID, 'days', true))
      let diffTime;
      
      switch(activeIDS[i][1]){
        case '7 dias':
          diffTime = currentTime.diff(timeID, 'days')
          if(diffTime > 7 )
          {
            console.log("bilhete inválido");
            activeIDS.splice(i,1);
            break;
          }
          console.log(diffTime.toString())
          activeIDS[i].push(timeID.toString());
          break;
        case '30 dias':
          diffTime = currentTime.diff(timeID, 'days')
          if(diffTime > 30)
          {
            activeIDS.splice(i,1);
            break;
          }
          activeIDS[i].push(timeID);
          console.log("timeID : %d",timeID);
          break;
        case 'unico':
          diffTime = currentTime.diff(timeID, 'minutes',true);
          if(diffTime > 40)
          {
            activeIDS.splice(i,1);
            break;
          }
          let new1 = moment.duration(diffTime, "minutes");
          console.log(new1.toString());   
          new1 = moment().subtract(40, 'minutes');
          break;
        case 'duplo':
          (currentTime - timeID)/(1000*60*40);
          break;          
      }
  }

// try{
//   for(let i in avalibleIds)
//     {
//       for(let j in activeIDS)
//       {

//         if(avalibleIds[i][0] === activeIDS[j][0])
//         {
//           avalibleIds.splice(i,1);
//         }
//       }
//     }
// }catch(err){
//   console.log(err)
// }
  






  res.send({
    avalibleIds: avalibleIds,
    activeIDS : activeIDS
  });

  res = {
    avalibleIds: avalibleIds,
    activeIDS : activeIDS
  };

});

app.post("/report", async (req,res) => {
  FK_BILHETE_id_bilhete = req.body.FK_BILHETE_id_bilhete;
  let result = await db.report(dbCredentials,FK_BILHETE_id_bilhete);
  console.log(result[0][0][0])
  let test = moment(result[0][0][0], "DD MM YYYY hh:mm:ss");
  console.log(test.toString())
  res.send({
    select1 : result[0],
    select2 : result[1],
    select3 : result[2]
  })
  res ={
    select1 : result[0],
    select2 : result[1],
    select3 : result[2]
  }
})




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
