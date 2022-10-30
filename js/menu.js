
//Codigo para salir
let btSalir = document.querySelector("#btExit")

btSalir.addEventListener("click",opSalir)

//alerta o notificacion
const notificacion = Swal.mixin({
    toast: false,
    position: 'center',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    allowOutsideClick: false,
    heightAuto: false,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

function alerta(icono, texto){
    notificacion.fire({
        icon: icono,
        title: texto
    })
}


function opSalir(){
    sessionStorage.clear()
    location.href="../index.html"
}

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

//inputs que se utilizan en los formularios
let dtTransDes = document.querySelector("#txtTranDestino")
let dtTransCan = document.querySelector("#txtTranCantidad")

//funciones de las operaciones
function transferir(){
    //obtener datos para la transferencia
    
    //realizar la transferencia

    //actualizar el arreglo de datos

    //actualizar el html de las tarjetas y cuentas

    //notificar del cambio o error
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
