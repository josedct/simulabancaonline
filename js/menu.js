
//modales
let modDepositar = $("#formDepo")
let modRetirar = $("#formReti")
let modTransferir = $("#formTran")
let modBloqDes = $("#formBloq")
let modTiempo = $("#formTiem")
let modPTarjeta = $("#formPtar")
let modPServicio = $("#formPser")
let modVernip = $("#formVnip") 
let modEstado = $("#formEcue")
let modMovimientos = $("#formMovi") 

//botones de operacion
let btDepositar = document.querySelector("#btDepo") 
let btRetirar = document.querySelector("#btReti")
let btTransferir = document.querySelector("#btTran")
let btBloqDes = document.querySelector("#btBloq")
let btTiempo = document.querySelector("#btTiem")
let btPTarjeta = document.querySelector("#btPtar")
let btPServicio = document.querySelector("#btPser")
let btVernip = document.querySelector("#btVnip") 
let btEstado = document.querySelector("#btEcue")
let btMovimientos = document.querySelector("#btMovi") 

//funciones de las operaciones
function depositar(){
    alert("Se presiono el boton de aplicar deposito")
    modDepositar.modal('hide')
}

function retirar(){
    alert("Se presiono el boton de aplicar retirar")
    modRetirar.modal('hide')
}

function transferir(){
    alert("Se presiono el boton de transferir")
    modTransferir.modal('hide')
}

function bloqdes(){
    alert("Se presiono el boton de bloquear o desbloquear")
    modBloqDes.modal('hide')
}

function recargar(){
    alert("Se presiono el boton de aplicar racarga de tiempo aire")
    modTiempo.modal('hide')
}

function pagarTarjeta(){
    alert("Se presiono el boton de pagar tarjeta")
    modPTarjeta.modal('hide')
}

function pagarServicio(){
    alert("Se presiono el boton de aplicar pagar servicio")
    modPServicio.modal('hide')
}

function verNip(){
    alert("Se presiono el boton de ver nip")
    modVernip.modal('hide')
}

function estadoCuenta(){
    alert("Se presiono el boton de ver estado de cuenta")
    modEstado.modal('hide')
}

function movimientos(){
    alert("Se presiono el boton de ver ultimos 20 movimientos")
    modMovimientos.modal('hide')
}

//eventos de las operaciones
btDepositar.addEventListener("click",depositar)
btRetirar.addEventListener("click",retirar)
btTransferir.addEventListener("click",transferir)
btBloqDes.addEventListener("click",bloqdes)
btTiempo.addEventListener("click",recargar)
btPTarjeta.addEventListener("click",pagarTarjeta)
btPServicio.addEventListener("click",pagarServicio)
btVernip.addEventListener("click",verNip)
btEstado.addEventListener("click",estadoCuenta)
btMovimientos.addEventListener("click",movimientos)