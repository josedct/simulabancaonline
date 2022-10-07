
//encabezado de aplicacion
let nom = document.querySelector("#nomCli")
let cli = document.querySelector("#infCli")

//cambiar encabezado al cargar la pagina
window.addEventListener("load",cargarDatosUsuario)

function cargarDatosUsuario(){
    nom.innerHTML = sessionStorage.getItem("Nombre")
    console.log(sessionStorage.getItem("Nombre"))
    cli.innerHTML = sessionStorage.getItem("NumCliente")
}

//Codigo para salir
let btSalir = document.querySelector("#btExit")

btSalir.addEventListener("click",opSalir)

function opSalir(){
    sessionStorage.clear()
    location.href="../index.html"
}


//Arreglos de base de datos de json
const Clientes = []
const Cuentas = []
const TsDebito = []
const TsCredito = []

//modales
let modTransferir = $("#formTran")
let modBloqDes = $("#formBloq")
let modTiempo = $("#formTiem")
let modPTarjeta = $("#formPtar")
let modPServicio = $("#formPser")
let modVernip = $("#formVnip") 
let modEstado = $("#formEcue")
let modMovimientos = $("#formMovi") 

//botones de operacion
let btTransferir = document.querySelector("#btTran")
let btBloqDes = document.querySelector("#btBloq")
let btTiempo = document.querySelector("#btTiem")
let btPTarjeta = document.querySelector("#btPtar")
let btPServicio = document.querySelector("#btPser")
let btVernip = document.querySelector("#btVnip") 
let btEstado = document.querySelector("#btEcue")
let btMovimientos = document.querySelector("#btMovi") 

//funciones de las operaciones
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
btTransferir.addEventListener("click",transferir)
btBloqDes.addEventListener("click",bloqdes)
btTiempo.addEventListener("click",recargar)
btPTarjeta.addEventListener("click",pagarTarjeta)
btPServicio.addEventListener("click",pagarServicio)
btVernip.addEventListener("click",verNip)
btEstado.addEventListener("click",estadoCuenta)
btMovimientos.addEventListener("click",movimientos)



//cargar json
fetch('./../json/datos.json')
.then((response) => response.json())
.then((datos) => {
    datos.Clientes.forEach(element => {Clientes.push(new Cliente(element.nomCom,element.numCli,element.fechNac,element.direccion,element.dni,element.nipCli))})
    datos.Cuentas.forEach(element => {Cuentas.push(new Cuenta(element.numCli,element.numCue,element.numTar,element.clabe,element.saldo))})
    datos.TarsDebito.forEach(element => {TsDebito.push(new TarjetaDebito(element.numCli,element.numCue,element.numTar,element.fechVen,element.nipTar,element.estado))})
    datos.TarsCredito.forEach(element => {TsCredito.push(new TarjetaCredito(element.numCli,element.numTar,element.fechVen,element.nipTar,element.estado,element.linCre,element.salPen))})
    console.log(Clientes)
    console.log(Cuentas)
    console.log(TsDebito)
    console.log(TsCredito)
})