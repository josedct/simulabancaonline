let valor

let Clientes = []

let form = document.querySelector("#ingresar")
form.addEventListener("submit",obtenerNip)

//cargar json
fetch('./json/datos.json')
.then((response) => response.json())
.then((datos) =>{
    datos.Clientes.forEach(element => {
        Clientes.push(new Cliente(element.nomCom,element.numCli,element.fechNac,element.direccion,element.dni,element.nipCli))
    })
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
        Toastify({
            text: "Nip incorrecto intente con otro",
            duration: 3000,
            style: {
                background: "linear-gradient(to top, #66ffff -20%, #ffffff 100%)",
                color: "#3333ff",
                border: "1px solid #3333ff",
                "border-radius": "10px",
            }
        }).showToast();
        txtnip.value=""
    }
}


