let valor

let Clientes = []

let form = document.querySelector("#ingresar")
form.addEventListener("submit",obtenerNip)

//cargar json
fetch('../json/datos.json')
.then((response) => response.json())
.then((datos) =>{
    datos.Clientes.forEach(element => {
        console.log("entra")
        Clientes.push(new Cliente(element.nomCom,element.numCli,element.fechNac,element.direccion,element.dni,element.nipCli))
        console.log(Clientes)
    })
})

function buscarNipCliente(nip){
    return Clientes.findIndex(Cliente => Cliente.nipCli == nip)
}

function obtenerNip(e){
    e.preventDefault()
    let nip = document.querySelector("#nip").value
    let indiceCliente = buscarNipCliente(nip)
    if (indiceCliente>=0) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Acceso permitido',
            showConfirmButton: false,
            timer: 1500
          })
        location.href="pages/menu.html"
    } else {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'acceso denegado',
            showConfirmButton: false,
            timer: 1500
          })
    }
}


