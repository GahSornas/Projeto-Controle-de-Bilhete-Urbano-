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
  .then(response => response.json())
  .then(response => console.log(response))
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
          console.log(response.activeIDS[i])
        }
    })
  }



document.getElementById("btnConsultarBilhete").onclick =  async function () {
  let campoID =  document.querySelector("#campoBilhete");
  console.log(campoID.value);
  await connectBack(campoID.value);
};


document.getElementById("btnFecharPopup").onclick = function () {
  document.getElementById("popupUtilizacao").style.display = "none";
};

function idBilheteClicado(idClicado){

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

function deleteTicket(){
  let ulBilhetesDisponiveis = document.querySelector("#ulBilhetesDisponiveis");
  let ulBilhetesAtivos = document.querySelector("#ulBilhetesAtivos");
  let apagarBilhete = document.getElementsByClassName("btnBilhetes");

  ulBilhetesDisponiveis.removeChild(apagarBilhete);
  ulBilhetesAtivos.removeChild(apagarBilhete);
}