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

          printBilhetesDisponiveis(response.avalibleIds[i][2],response.avalibleIds[i][0]);

        }



        for(let i in response.activeIDS)
        {
          console.log(response.activeIDS[i]);
          

          
          printBilhetesAtivos(response.activeIDS[i][1], response.activeIDS[i][3],response.activeIDS[i][0]);


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
  bilheteAtivo.setAttribute("onclick", "idBilheteClicado(this.id), abrirPopup()");
  

  let h3TipoBilhete = document.createElement("h3");
  h3TipoBilhete.innerHTML = tipoBilhete;
  bilheteAtivo.appendChild(h3TipoBilhete);

  let pTexto = document.createElement("p");
  pTexto.innerHTML = "Tempo restante:"
  bilheteAtivo.appendChild(pTexto);

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
  bilheteDisponivel.setAttribute("onclick", "idBilheteClicado(this.id), abrirPopup()");

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
  
function abrirPopup(){
  document.getElementById("popupUtilizacao").style.display = "block";
}

document.getElementById("btnFecharPopup").onclick = function () {
  document.getElementById("popupUtilizacao").style.display = "none";
};