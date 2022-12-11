async function connectBack(FK_BILHETE_id_bilhete){
  await fetch('/report',{
    method:'POST',
    headers : {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body : JSON.stringify
    (
      {
        FK_BILHETE_id_bilhete : FK_BILHETE_id_bilhete
      }
    )
  }
  )
    .then(response => response.json())
    .then(response => JSON.parse(JSON.stringify(response)))
    .then(res => res.utilizes)
    .then(res => {
      printDataGeracao(getonlydate(res[0][0]));
      for(let i in res)
      {
        printRecarga(res[i][1],getonlydate(res[i][2]))

        for(let j in res[i]){
           printUtilizacao(getonlydate(res[i][3]),getHoursandMinutea(res[i][3]))
        }
        //printUtilizacao(getonlydate(res[i][3]),getHoursandMinutea(res[i][3]));
        console.log("get only date :"+ getonlydate(res[i][3]) + "hours :" +getHoursandMinutea(res[i][3]))
      }
    })
    .catch(error => console.log(error))
}

function getHoursandMinutea(data)
{
  data = new Date(data)
  var hh = data.getHours();
  var mm = data.getMinutes();
  data = hh + ':' + mm;
  return data;
}


function getonlydate(today)
{
  today = new Date(today)
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
   var today = dd + '/' + mm + '/' + yyyy;
  return today;
}

// async function consulta() {
//   let campoID  =document.querySelector("#campoBilhete");
//   console.log(campoID.value);
// }

// //estrutura dos prints //
// printDataGeracao(apenas 0 data)
// for(let i in response.avalibleIds)
//   {
//   printRecarga(1, 2 data)
//   for(let i in response.avalibleIds){
//     printUtilizacao(3 data, 3 hora)
//   }
// }

document.getElementById("btnConsultarBilhete").onclick = async function () {
  let campoID = document.querySelector("#campoBilhete");
  console.log(campoID.value);
  connectBack(campoID.value);
};

function printDataGeracao(dataGeracao){
  //printar data de geração do bilhete
  let showDataGeracao = document.querySelector("#showDataGeracao");
  showDataGeracao.innerHTML = dataGeracao;
}

function printRecarga(tipoRecarga, dataRecarga) {
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
  ulUtilizacao.id = "ulUtilizacao";
  divRecargas.appendChild(ulUtilizacao);
};

function printUtilizacao(dataUtilizacao, hrUtilizacao){
  //criação ul e div
  let ulUtilizacao = document.getElementById("ulUtilizacao");
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