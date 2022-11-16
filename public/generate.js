document.getElementById("btnGerarBilhete").onclick = 
     async function () {
    document.getElementById("showID").innerHTML = "bilhete sendo gerado";
    fetch('/generate',{method:'POST'})
        .then(response => console.log(response))
        .catch(error => console.log(error))
        console.log("RESPONSE OBTIDO")
    };





//const header = document.getElementById("showID")

