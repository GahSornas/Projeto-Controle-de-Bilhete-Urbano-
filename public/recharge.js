// document.getElementById("btnRecarga").onclick =
// async function () {
//     value= document.getElementById('campoBilheteRecarga').outerHTML;
//     fetch('/recharge',{
//         method:'POST',
//         id : value,
//         kindID : "unico"
//     })
//         .then(response => response.json())
//         .then(response => document.getElementById("showID").innerHTML = response['id'])
//         .catch(error => console.log(error))
//         }

function abrirPopupBilUnico(id) {
  document.getElementById(id).style.display = "block";
  const campoID = document.querySelector("#campoBilheteRecarga");
  console.log(campoID.value);
  console.log("unico");
}

function abrirPopupBilDuplo(id) {
    document.getElementById(id).style.display = "block";
    const campoID = document.querySelector("#campoBilheteRecarga");
    console.log(campoID.value);
    console.log("duplo");
}

function abrirPopupBil7(id) {
    document.getElementById(id).style.display = "block";
    const campoID = document.querySelector("#campoBilheteRecarga");
    console.log(campoID.value);
    console.log("7 dias");
}

function abrirPopupBil30(id) {
    document.getElementById(id).style.display = "block";
    const campoID = document.querySelector("#campoBilheteRecarga");
    console.log(campoID.value);
    console.log("30 dias");
}

function fecharPopup(id) {
  document.getElementById(id).style.display = "none";
}
