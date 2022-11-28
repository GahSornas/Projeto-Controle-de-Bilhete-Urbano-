function consulta(){
    document.getElementsByClassName("btnConsultarBilhete").addEventListener("click",function(){
        var listaBilhetesAtivos=document.getElementsByClassName("divBilhetesAtivos");
        
        var bilheteAtivo=document.createElement("button.btnBilhetesAtivos");
        bilheteAtivo.textContent="teste";
        listaBilhetesAtivos.appendChild(bilheteAtivo);
    });
}
