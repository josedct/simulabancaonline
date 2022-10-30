// se selecciona el formulario de login
let form = document.querySelector("#ingresar")

// se selecciona el input donde se ingresa el nip
let txtnip=document.querySelector("#nip")

//funcion que busca un nip dado en todos los clientes
function buscarNipCliente(nip){
    return datosCliente.findIndex(Cliente => Cliente.nipCli == nip)
}

//funcion que verifica si existe un nip correcto o no
function verificarNip(e){
    e.preventDefault()
    let nip =txtnip.value
    let indiceCliente = buscarNipCliente(nip)
    if (indiceCliente>=0) {
        //Si se encuentra el nip, se carga la informacion del cliente que inicio la sesion en el sessionStorage y se carga la pagina con las opciones permitidas para el usuario
        sessionStorage.setItem("nombre",datosCliente[indiceCliente].verNombre())
        sessionStorage.setItem("numCliente",datosCliente[indiceCliente].verNumCliente())
        sessionStorage.setItem("index",indiceCliente)
        location.href="pages/menu.html"
    } else {
        //En caso de no encontrar el nip se manda un mensaje de error, se limpia el input y se mantiene la misma pagina
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

        notificacion.fire({
            icon: 'error',
            title: 'Oops... Nip Incorrecto'
        })
        txtnip.value=""
    }
}

//agregamos la funcion al formulario para atrapar el evento submit y verificar el nip
form.addEventListener("submit",verificarNip)

