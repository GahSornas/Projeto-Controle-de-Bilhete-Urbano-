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
    .catch(error => console.log(error))
  }


  async function consulta(){
    let campoID = document.querySelector("#campoBilhete");
    console.log(campoID.value);
    connectBack(campoID.value)
}


let tipoBilhete;
let tempoRestante;
let pulaLinha = document.createElement("br");

let ulBilhetesAtivos = document.querySelector("#ulBilhetesAtivos");
let bilheteAtivo = document.createElement("button");
bilheteAtivo.classList.add("btnBilhetes");
bilheteAtivo.appendChild(`${tipoBilhete}`);
bilheteAtivo.appendChild(pulaLinha);
bilheteAtivo.appendChild(`${tempoRestante}`);
ulBilhetesAtivos.appendChild(bilheteAtivo);


let ulBilhetesDisponiveis = document.querySelector("#ulBilhetesDisponiveis");
let bilheteDisponivel = document.createElement("button");
bilheteDisponivel.classList.add("btnBilhetes");
bilheteDisponivel.appendChild(`${tipoBilhete}`);
ulBilhetesDisponiveis.appendChild(bilheteDisponivel);
