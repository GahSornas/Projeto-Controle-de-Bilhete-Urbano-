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

document.button.getElementsByClassName("btnRecargaUnico").onclick = 
     function(){
        var uwu = document.getElementById('campoBilheteRecarga').value;
        console.log(uwu);
    }


//  function(){
//     var value = document.getElementById('campoBilheteRecarga').value;
//     console.log(value)
//     console.log(value)
// }
// document.button.getElementsByClassName("btnRecarga").onclick =  async function () {
//   console.log("uwu");
//     fetch('/recharge',{
//         method:'POST',

//         id : "1234",
//         kindID : "unico"
//     })
//         .then(response => response.json())
//         .then(response => document.getElementById("showID").innerHTML = response['id'])
//         .catch(error => console.log(error))
// };

async function abrirPopup(id) {
  document.getElementById(id).style.display = "block";
  await fetch('/teste',{
    method:'POST',
    headers : {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body : JSON.stringify
    (
      {
         id : "17063",
         kindID : "unico"
      }
    )
})
    .then(response => response.json())
    .then(response => console.log(response))
    //.then(response => document.getElementById("showID").innerHTML = response['id'])
    .catch(error => console.log(error))
}
function fecharPopup(id) {
  document.getElementById(id).style.display = "none";
}
