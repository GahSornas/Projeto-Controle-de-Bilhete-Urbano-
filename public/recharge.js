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