// const moment = require('moment'); // require
// moment().format(); 


async function connectBack(FK_BILHETE_id_bilhete) {
  await fetch("/report", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      FK_BILHETE_id_bilhete: FK_BILHETE_id_bilhete,
    }),
  })
    .then((response) => response.json())
    .then((response) => JSON.parse(JSON.stringify(response)))
    .then((res) => {
      
      printDataGeracao(res.select1[0][0]); 

      for (let i in res.select2) {       //só data//
        //console.log( res.select2[i][0], res.select2[i][1], res.select2[i][2])
        printRecarga(res.select2[i][0], res.select2[i][1], res.select2[i][2]);

        for (let j in res.select3[i]) {

          
          //console.log(res.select3[i][j][0]+"  "+res.select3[i][j][2]+"   "+res.select2[i][2])        
          printUtilizacao(res.select3[i][j][0], res.select3[i][j][2], res.select2[i][2]);
          //printUtilizacao(onlyDate, onlyDayTime, res.select2[i][2]);
        }                   //só data//          //só hr//
      }
    })
    .catch((error) => console.log(error));
}





document.getElementById("btnConsultarBilhete").onclick = async function () {
  deleteHistorico()
  let campoID = document.querySelector("#campoBilhete");
  //console.log(campoID.value);
  connectBack(campoID.value);
};

function printDataGeracao(dataGeracao) {
  //printar data de geração do bilhete
  let showDataGeracao = document.querySelector("#showDataGeracao");
  showDataGeracao.innerHTML = dataGeracao;
}

function printRecarga(tipoRecarga, dataRecarga, idUl1) {
  //criação de div e inserção em ul existente
  let ulRecargas = document.querySelector("#ulRecargas");
  let divRecargas = document.createElement("div");
  divRecargas.classList.add("divRecarga");
  ulRecargas.appendChild(divRecargas);

  //div com informações do bilhete
  let divInfoRecarga = document.createElement("div");
  divInfoRecarga.classList.add("divInfoRecarga");
  divRecargas.appendChild(divInfoRecarga);

  //inserir tipo da recarga / texto / data
  let h3TipoRecarga = document.createElement("h3");
  h3TipoRecarga.innerHTML = tipoRecarga;
  divInfoRecarga.appendChild(h3TipoRecarga);

  let h3texto = document.createElement("h3");
  h3texto.innerHTML = "Data de geração:";
  divInfoRecarga.appendChild(h3texto);

  let h3DataRecarga = document.createElement("h3");
  h3DataRecarga.innerHTML = dataRecarga;
  divInfoRecarga.appendChild(h3DataRecarga);

  //criação ulUtilizacao
  let ulUtilizacao = document.createElement("ul");
  ulUtilizacao.classList.add("ulUtilizacao");
  ulUtilizacao.id = idUl1;
  divRecargas.appendChild(ulUtilizacao);
}

function printUtilizacao(dataUtilizacao, hrUtilizacao, idUl2) {
  //criação ul e div
  let ulUtilizacao = document.getElementById(idUl2);
  let divInfoUtilizacao = document.createElement("div");
  divInfoUtilizacao.classList.add("divInfoUtilizacao");
  ulUtilizacao.appendChild(divInfoUtilizacao);

  //inserir texto / data / hora
  let h4Texto = document.createElement("h4");
  h4Texto.innerHTML = "Utilização:";
  divInfoUtilizacao.appendChild(h4Texto);

  let h4DataUtilizacao = document.createElement("h4");
  h4DataUtilizacao.innerHTML = dataUtilizacao;
  divInfoUtilizacao.appendChild(h4DataUtilizacao);

  let h4HrUtilizacao = document.createElement("h4");
  h4HrUtilizacao.innerHTML = hrUtilizacao;
  divInfoUtilizacao.appendChild(h4HrUtilizacao);
}

function deleteHistorico() {
  let apagarHistorico = document.querySelectorAll(".divRecarga");
  apagarHistorico.forEach((divRecarga) => {
    divRecarga.remove();
  });
}
