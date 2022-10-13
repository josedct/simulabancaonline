const Clientes = []
const Cuentas = []
const TsDebito = []
const TsCredito = []

let form = document.querySelector("#ingresar")
form.addEventListener("submit",obtenerNip)

//cargar json
fetch('./json/datos.json')
.then((response) => response.json())
.then((datos) =>{
    datos.Clientes.forEach(element => {Clientes.push(new Cliente(element.nomCom,element.numCli,element.fechNac,element.direccion,element.dni,element.nipCli))})
    datos.Cuentas.forEach(element => {Cuentas.push(new Cuenta(element.numCli,element.numCue,element.numTar,element.clabe,element.saldo))})
    datos.TarsDebito.forEach(element => {TsDebito.push(new TarjetaDebito(element.numCli,element.numCue,element.numTar,element.fechVen,element.nipTar,element.estado))})
    datos.TarsCredito.forEach(element => {TsCredito.push(new TarjetaCredito(element.numCli,element.numTar,element.fechVen,element.nipTar,element.estado,element.linCre,element.salPen))})
})

function buscarNipCliente(nip){
    return Clientes.findIndex(Cliente => Cliente.nipCli == nip)
}

let txtnip=document.querySelector("#nip")

function obtenerNip(e){
    e.preventDefault()
    let nip =txtnip.value
    let indiceCliente = buscarNipCliente(nip)
    if (indiceCliente>=0) {
        sessionStorage.setItem("Nombre",Clientes[indiceCliente].verNombre())
        sessionStorage.setItem("NumCliente",Clientes[indiceCliente].verNumCliente())
        sessionStorage.setItem("FechNac",Clientes[indiceCliente].verFechNac())
        sessionStorage.setItem("Direccion",Clientes[indiceCliente].verDireccion())
        sessionStorage.setItem("Dni",Clientes[indiceCliente].verDni())
        sessionStorage.setItem("Nip",Clientes[indiceCliente].verNipCliente())
        location.href="pages/menu.html"
    } else {
        const Toast = Swal.mixin({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 10000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

        Toast.fire({
            icon: 'error',
            title: 'Oops... Nip Incorrecto'
        })
        txtnip.value=""
    }
}


