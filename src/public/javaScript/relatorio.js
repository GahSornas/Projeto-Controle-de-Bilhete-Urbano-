// async function consulta() {
//   let campoID = document.querySelector("#campoBilhete");
//   console.log(campoID.value);
// }

document.getElementById("btnConsultarBilhete").onclick = async function () {
  let dataGeracao = "22/10/22";
  let tipoRecarga = "BILHETE 30 DIAS";
  let dataRecarga = "30/11/22";
  let dataUtilizacao = "5/12/22";
  let hrUtilizacao = "18:30";

  //printar data de geração do bilhete
  let showDataGeracao = document.querySelector("#showDataGeracao");
  showDataGeracao.innerHTML = dataGeracao;

  //criação de div e inserção em ul existente
  let ulRecargas = document.querySelector("#ulRecargas");
  let divRecargas = document.createElement("div");
  divRecargas.classList.add("divRecarga");
  ulRecargas.appendChild(divRecargas);

  //div com informações do bilhete
  let divInfoRecarga = document.createElement("div");
  divInfoRecarga.classList.add("divInfoRecarga");
  divRecargas.appendChild(divInfoRecarga);

  //inserir tipo da recarga / texto / data
  let h3TipoRecarga = document.createElement("h3");
  h3TipoRecarga.innerHTML = tipoRecarga;
  divInfoRecarga.appendChild(h3TipoRecarga);

  let h3texto = document.createElement("h3");
  h3texto.innerHTML = "Data de geração:";
  divInfoRecarga.appendChild(h3texto);

  let h3DataRecarga = document.createElement("h3");
  h3DataRecarga.innerHTML = dataRecarga;
  divInfoRecarga.appendChild(h3DataRecarga);

  //criação ul e div
  let ulUtilizacao = document.createElement("ul");
  ulUtilizacao.id = "ulUtilizacao";
  divRecargas.appendChild(ulUtilizacao);
  let divInfoUtilizacao = document.createElement("div");
  divInfoUtilizacao.classList.add("divInfoUtilizacao");
  ulUtilizacao.appendChild(divInfoUtilizacao);

  //inserir texto / 
  let h4Texto = document.createElement("h4");
  h4Texto.innerHTML = "Utilização:";
  divInfoUtilizacao.appendChild(h4Texto);

  let h4DataUtilizacao = document.createElement("h4");
  h4DataUtilizacao.innerHTML = dataUtilizacao;
  divInfoUtilizacao.appendChild(h4DataUtilizacao);

  let h4HrUtilizacao = document.createElement("h4");
  h4HrUtilizacao.innerHTML = hrUtilizacao;
  divInfoUtilizacao.appendChild(h4HrUtilizacao);
};
