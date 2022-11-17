document.getElementById("btnGerarBilhete").onclick = 
     async function () {
    document.getElementById("showID").innerHTML = "bilhete sendo gerado";
    fetch('/generate',{method:'POST'})
        .then(response => response.json())
        .then(response => document.getElementById("showID").innerHTML = response['id'])
        .catch(error => console.log(error))
    };





//const header = document.getElementById("showID")

