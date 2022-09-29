
//modales
let modDepositar = document.querySelector("#formDepo")
let modRetirar = document.querySelector("#formReti")

//botones de operacion
let btDepositar = document.querySelector("#btDepo") 
let btRetirar = document.querySelector("#btReti")

btDepositar.addEventListener("click",depositar)
btRetirar.addEventListener("click",retirar)

function depositar(){
    alert("Se presiono el boton de aplicar deposito")
    $("#formDepo").modal('hide')
}

function retirar(){
    alert("Se presiono el boton de aplicar retirar")
    $("#formReti").modal('hide')
}