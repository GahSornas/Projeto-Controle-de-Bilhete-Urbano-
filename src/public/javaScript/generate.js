document.getElementById("btnGerarBilhete").onclick = async function () {
  document.getElementById("popupIdGerado").style.display = "block";
  document.getElementById("showID").innerHTML = "bilhete sendo gerado";
  fetch("/generate", { method: "POST" })
    .then((response) => response.json())
    .then(
      (response) =>
        (console.log(response))
    )
    .catch((error) => console.log(error));
};

//const header = document.getElementById("showID")
