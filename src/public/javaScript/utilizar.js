async function connectBack(id){
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
        console.log(response.activeIDS)
    })
    // .then(response=> 
    // {
    //     for(let i in avalibleIds)
    //     {
    //         console.log(avalibleIds[i])
    //     }
    // })
    .catch(error => console.log(error))
  }


document.getElementById("btnFecharPopup").onclick = function () {
  document.getElementById("popupUtilizacao").style.display = "none";
};

function printBilhetesAtivos(tipoBilhete, tempoRestante) {
  //BILHETES ATIVOS
  let ulBilhetesAtivos = document.querySelector("#ulBilhetesAtivos");
  let bilheteAtivo = document.createElement("button");
  bilheteAtivo.classList.add("btnBilhetes");

  let h3TipoBilhete = document.createElement("h3");
  h3TipoBilhete.innerHTML = tipoBilhete;
  bilheteAtivo.appendChild(h3TipoBilhete);

  let pTempoRestante = document.createElement("p");
  pTempoRestante.innerHTML = tempoRestante;
  bilheteAtivo.appendChild(pTempoRestante);

  ulBilhetesAtivos.appendChild(bilheteAtivo);

};

function printBilhetesDisponiveis(tipoBilhete){
  //BILHETES DISPONIVEIS
  let ulBilhetesDisponiveis = document.querySelector("#ulBilhetesDisponiveis");
  let bilheteDisponivel = document.createElement("button");
  bilheteDisponivel.classList.add("btnBilhetes");

  let h3TipoBilhete = document.createElement("h3");
  h3TipoBilhete.innerHTML = tipoBilhete;
  bilheteDisponivel.appendChild(h3TipoBilhete);

  ulBilhetesDisponiveis.appendChild(bilheteDisponivel);
}

document.getElementById("btnConsultarBilhete").onclick = async function () {
  let campoID = document.querySelector("#campoBilhete");
  console.log(campoID.value);
  connectBack(campoID.value);

};