let dataGeracao;
let tipoRecarga;
let dataRecarga;
let dataUtilizacao;
let hrUtilizacao;

let showDataGeracao = document.querySelector("#showDataGeracao");
showDataGeracao.appendChild(dataGeracao);

let ulRecargas = document.querySelector("#ulRecargas");

let divRecargas = document.createElement("div");
divRecargas.classList.add("divRecarga");
ulRecargas.appendChild(divRecargas);

let divInfoRecarga = document.createElement("div");
divInfoRecarga.classList.add("divInfoRecarga");
divRecargas.appendChild(divInfoRecarga);

let h3TipoRecarga = document.createElement("h3");
h3TipoRecarga.appendChild(tipoRecarga);
divInfoRecarga.appendChild(h3TipoRecarga);
let h3texto = document.createElement("h3");
h3texto.appendChild("Data de geração:");
divInfoRecarga.appendChild(h3texto);
let h3DataRecarga = document.createElement("h3");
h3DataRecarga.appendChild(dataRecarga);
divInfoRecarga.appendChild(h3DataRecarga);

let ulUtilizacao = document.createElement("ul");

divRecargas.appendChild(ulUtilizacao);


