
async function consulta(){
    let campoID = document.querySelector("#campoBilhete");
    console.log(campoID.value);
}

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
ulUtilizacao.id = 'ulUtilizacao';
divRecargas.appendChild(ulUtilizacao);

let divInfoUtilizacao = document.createElement("div");
divInfoUtilizacao.classList.add("divInfoUtilizacao")
ulUtilizacao.appendChild(divInfoUtilizacao);

let h4Texto = document.createElement("h4");
h4Texto.appendChild("Utilização:");
divInfoUtilizacao.appendChild(h4Texto);
let h4DataUtilizacao = document.createElement("h4");
h4DataUtilizacao.appendChild(dataUtilizacao);
divInfoUtilizacao.appendChild(h4DataUtilizacao);
let h4HrUtilizacao = document.createElement("h4");
h4HrUtilizacao.appendChild(hrUtilizacao);
divInfoUtilizacao.appendChild(h4HrUtilizacao);