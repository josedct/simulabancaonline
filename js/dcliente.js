//aqui solo se cargan los datos de los clientes para verificar los nip
const datosCliente = []

//cargar solo los datos de los clientes que estan en el json
async function leerDeJSON(){
    const response = await fetch('./../json/datos.json')
    const datos = await response.json()
    datos.Clientes.forEach(element => {datosCliente.push(new Cliente(element.nomCom,element.numCli,"","","",element.nipCli))})
    console.log(datos)
    console.log(datosCliente)
}

function leerDeSessionStorage(){
    let datos = JSON.parse(localStorage.getItem("dApp"))
    datos.Clientes.forEach(element => {datosCliente.push(new Cliente(element.nomCom,element.numCli,"","","",element.nipCli))})
    console.log(datos)
    console.log(datosCliente)
}

if(localStorage.getItem("dApp") != null){
    leerDeSessionStorage()
} else{
    leerDeJSON()
}