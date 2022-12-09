//function teste(id) {
//  document.getElementById(id).style.display = "flex";
//}

async function connectBack(id){
    await fetch('/utilize',{
      method:'POST',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body : JSON.stringify
      (
        {
           id : id,
        }
      )
    }
    )
    then(response => response.json())
      .then(response => console.log(response))
      .catch(error => console.log(error))
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
