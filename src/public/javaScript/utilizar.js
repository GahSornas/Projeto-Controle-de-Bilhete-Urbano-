async function utilizeID(FK_RECARGA_id_recarga){
  await fetch('/utilizeID',{
    method:'POST',
    headers : {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'dataType': 'json'
    },
    body : JSON.stringify
    (
      {
        FK_RECARGA_id_recarga : FK_RECARGA_id_recarga,
      }
    )
  }
  )
  // .then(response => response.json())
  // .then(response => console.log(response))
}

async function connectBack(id){
  //console.log("fetching...") 
  await fetch('/utilize',{
      method:'POST',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'dataType': 'json'
      },
      body : JSON.stringify
      (
        {
           id : id,
        }
      )
    }
    )
    .then(response => response.json())
    .then(response => JSON.parse(JSON.stringify(response)))
    .then(response=> 
    {
        console.log(response.avalibleIds)
        for(let i in response.avalibleIds)
        {
            console.log(response.avalibleIds[i][2],response.avalibleIds[i][0])
            printBilhetesDisponiveis(response.avalibleIds[i][2],response.avalibleIds[i][0]);
        }



        for(let i in response.activeIDS)
        {
          console.log(response.activeIDS[i]);
          
          // 0: 24688
          // ​
          // 1: "7 dias"
          // ​
          // 2: "2022-12-11T21:35:36.121Z"
          // ​
          // 3: "0.00"
          // printBilhetesAtivos(response.activeIDS[i][1], response.activeIDS[i][3],response.activeIDS[i][0]);
          

          switch(response.activeIDS[i][1]){
            case '7 dias':
              response.activeIDS[i][3] = 7 - response.activeIDS[i][3];
              printBilhetesAtivos(response.activeIDS[i][1], response.activeIDS[i][3],response.activeIDS[i][0]);
              break;
            case '30 dias':
              response.activeIDS[i][3] = 30 - response.activeIDS[i][3];
              printBilhetesAtivos(response.activeIDS[i][1], response.activeIDS[i][3],response.activeIDS[i][0]);
              break;
            case 'unico':
              response.activeIDS[i][3] = 40 - response.activeIDS[i][3];
              printBilhetesAtivos(response.activeIDS[i][1], response.activeIDS[i][3],response.activeIDS[i][0]);
              break;
            case 'duplo':
              printBilhetesAtivos(response.activeIDS[i][1], response.activeIDS[i][3],response.activeIDS[i][0]);
              break;          
          }
        }
    })
  }



document.getElementById("btnConsultarBilhete").onclick =  async function () {
  
  deleteTicket();
  let campoID =  document.querySelector("#campoBilhete");
  await connectBack(campoID.value);
};


async function idBilheteClicado(idClicado){
  console.log(idClicado);
  await utilizeID(idClicado);
  deleteTicket();
  let campoID =  document.querySelector("#campoBilhete");
}

function printBilhetesAtivos(tipoBilhete, tempoRestante, idBilhete) {
  //BILHETES ATIVOS
  let ulBilhetesAtivos = document.querySelector("#ulBilhetesAtivos");
  let bilheteAtivo = document.createElement("button");
  bilheteAtivo.classList.add("btnBilhetes");
  bilheteAtivo.id = idBilhete;
  bilheteAtivo.setAttribute("onclick", "idBilheteClicado(this.id)");

  let h3TipoBilhete = document.createElement("h3");
  h3TipoBilhete.innerHTML = tipoBilhete;
  bilheteAtivo.appendChild(h3TipoBilhete);

  let pTempoRestante = document.createElement("p");
  pTempoRestante.innerHTML = tempoRestante;
  bilheteAtivo.appendChild(pTempoRestante);

  ulBilhetesAtivos.appendChild(bilheteAtivo);
}

function printBilhetesDisponiveis(tipoBilhete, idBilhete) {
  //BILHETES DISPONIVEIS
  let ulBilhetesDisponiveis = document.querySelector("#ulBilhetesDisponiveis");
  let bilheteDisponivel = document.createElement("button");
  bilheteDisponivel.classList.add("btnBilhetes");
  bilheteDisponivel.id = idBilhete;
  bilheteDisponivel.setAttribute("onclick", "idBilheteClicado(this.id)");

  let h3TipoBilhete = document.createElement("h3");
  h3TipoBilhete.innerHTML = tipoBilhete;
  bilheteDisponivel.appendChild(h3TipoBilhete);

  ulBilhetesDisponiveis.appendChild(bilheteDisponivel);
}

function deleteTicket() {
  let apagarBilhete = document.querySelectorAll(".btnBilhetes");
  apagarBilhete.forEach((btnBilhetes) => {
    btnBilhetes.remove();
  });
}
  
document.querySelectorAll(".btnBilhetes").onclick = function(){
  document.getElementById("popupUtilizacao").style.display = "block";
}

document.getElementById("btnFecharPopup").onclick = function () {
  document.getElementById("popupUtilizacao").style.display = "none";
};