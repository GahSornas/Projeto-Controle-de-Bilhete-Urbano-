async function connectBack(id,kindID,credits){
  await fetch('/recharge',{
    method:'POST',
    headers : {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body : JSON.stringify
    (
      {
         id : id,
         kindID : kindID,
         credits : credits
      }
    )
  }
  )
  then(response => response.json())
    .then(response => console.log(response))
    //.then(response => document.getElementById("showID").innerHTML = response['id'])
    .catch(error => console.log(error))
}


async function abrirPopup(id) {
  document.getElementById(id).style.display = "block";
}

async function abrirPopupBilUnico(id) {
  let campoID = document.querySelector("#campoBilheteRecarga");
  if(campoID == 0){
    return null;
  }
  document.getElementById(id).style.display = "block";
  console.log(campoID.value);
  connectBack(campoID.value,"unico", 1);
  console.log("unico");
  console.log(1);
}

async function abrirPopupBilDuplo(id) {
    document.getElementById(id).style.display = "block";
    let campoID = document.querySelector("#campoBilheteRecarga");
    connectBack(campoID.value,"duplo", 2);
    console.log(campoID.value);
    console.log("duplo");
    console.log(2);
}

async function abrirPopupBil7(id) {
    document.getElementById(id).style.display = "block";
    let campoID = document.querySelector("#campoBilheteRecarga");
    console.log(campoID.value);
    connectBack(campoID.value,"7 dias", 1);
    console.log("7 dias");
    console.log(1);
}

async function abrirPopupBil30(id) {
    document.getElementById(id).style.display = "block";
    let campoID = document.querySelector("#campoBilheteRecarga");
    console.log(campoID.value);
    connectBack(campoID.value,"30 dias", 1);
    console.log("30 dias");
    console.log(1);
}

function fecharPopup(id) {
  document.getElementById(id).style.display = "none";
}
