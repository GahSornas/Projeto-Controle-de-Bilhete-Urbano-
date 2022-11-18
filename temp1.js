async function run(){
    fetch('/recharge',{
        method:"POST",
        body : {
            id : "7404",
        kindID : "unico"
        }
        })
    .then(res => res.json())
    .then(res => console.log(res))
} 



run()