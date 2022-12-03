//function teste(id) {
//  document.getElementById(id).style.display = "flex";
//}

let tipoBilhete;
let tempoRestante;

let ulBilhetesAtivos = document.querySelector("#ulBilhetesAtivos");
let bilheteAtivo = document.createElement("button");
let pulaLinha = document.createElement("br");
bilheteAtivo.appendChild(`${tipoBilhete}`);
bilheteAtivo.appendChild(pulaLinha);
bilheteAtivo.appendChild(`${tempoRestante}`);
bilheteAtivo.classList.add("btnBilhetesAtivos");
ulBilhetesAtivos.appendChild(bilheteAtivo);
