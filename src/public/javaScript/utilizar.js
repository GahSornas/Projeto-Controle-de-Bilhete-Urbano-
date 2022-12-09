//function teste(id) {
//  document.getElementById(id).style.display = "flex";
//}

function consulta() {
  let campoID = document.querySelector("#campoBilhete");
  console.log(campoID.value);
}

function fecharPopup(id) {
  document.getElementById(id).style.display = "none";
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
