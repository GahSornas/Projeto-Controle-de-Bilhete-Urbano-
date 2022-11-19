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



function abrirPopup(id) {
  document.getElementById(id).style.display = "block";
  const campoID = document.querySelector("#campoBilheteRecarga");
  console.log(campoID.value);
}
function fecharPopup(id) {
  document.getElementById(id).style.display = "none";
}

