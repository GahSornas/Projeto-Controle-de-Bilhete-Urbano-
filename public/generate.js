document.getElementById("btnGerarBilhete").onclick = function () {
    document.getElementById("showID").innerHTML = "gerando bilhete...";
    fetch('/generate',{method:'POST'})

};


//const header = document.getElementById("showID")

