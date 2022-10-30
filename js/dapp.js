//cargar de sesion storage los datos del cliente que inicio sesion
let nomCli = sessionStorage.getItem("nombre")
let numCli = sessionStorage.getItem("numCliente")
let indCli = sessionStorage.getItem("index")
let idTCActual
let salTCActual
let tipTCActual
let btTCActual

//areglos para cargar todos los datos del json y los datos del cliente actual
const datosApp = {Clientes:[],Cuentas:[],TsDebito:[],TsCredito:[]}


//elementos html que cambian segun el cliente que inicia sesion
let nom = document.querySelector("#nomCli")
let cli = document.querySelector("#infCli")
let inf = document.querySelector("#infoCT")
let bttr = document.querySelector("#btoptr")    
let btbd = document.querySelector("#btopbd")    
let btta = document.querySelector("#btopta")    
let btpt = document.querySelector("#btoppt")    
let btps = document.querySelector("#btopps")    
let btvn = document.querySelector("#btopvn")    
let btec = document.querySelector("#btopec")    
let btmo = document.querySelector("#btopmo")
let sltc = document.querySelector("#selectToC")
let sllc = document.querySelector("#txtPagarTDestino")
let slsp = document.querySelector("#txtPagarSalPend")   

//leer el estado de bloqueo la tarjeta
btbd.addEventListener('click',mostrarEstadoEnForm)

function mostrarEstadoEnForm()
{
    if(tipTCActual == "Debito" || tipTCActual == "Credito"){
        let est = buscarEstadoTarjeta(tipTCActual,idTCActual)
        if(est == "activa"){
            dtBloquChk.checked = false
            dtBloquTxt.textContent = "Bloqueo Inactivo"
        }else{
            dtBloquChk.checked = true
            dtBloquTxt.textContent = "Bloqueo Activo"
        }
    }
}

//leer las tarejetas de credito del usuario y listarlas en el formulario

btpt.addEventListener('click',mostrarListaCreditos)

function mostrarListaCreditos(){
    sllc.innerHTML=""
    sllc.innerHTML="<option disabled selected hidden>Seleccione Tarjeta a pagar</option>"
    buscarTsCreditoCliente(numCli).forEach(tcred => {
        let opt = document.createElement('option')
        opt.value = tcred.numTar
        opt.text = tcred.numTar
        sllc.append(opt)
    })
    dtPagaSSel.textContent="0.00"
    console.log("cambia creditos")
}



//inputs que se actualizan al seleccionar tarjeta o cuenta al dar clic
let dtTransOri = document.querySelector("#txtTranOrigen") 
let dtTransSal = document.querySelector("#txtTranSaldo")
let dtBloquOri = document.querySelector("#txtBloqOrigen")
let dtRecarOri = document.querySelector("#txtRecarOrigen")
let dtRecarSal = document.querySelector("#txtRecarSaldo")
let dtPagaTOri = document.querySelector("#txtPagarTOrigen")
let dtPagaTSal = document.querySelector("#txtPagarTSaldo")
let dtPagaSOri = document.querySelector("#txtPagarSOrigen")
let dtPagaSSal = document.querySelector("#txtPagarSSaldo")
let dtNipOrige = document.querySelector("#txtOrigenNip")
let dtNipMostr = document.querySelector("#txtMostraNip")

//chebox de activar o desactivar tarjeta
let dtBloquChk = document.querySelector("#txtBloqActivo")
let dtBloquTxt = document.querySelector("label[for=\"txtBloqActivo\"]")

dtBloquChk.addEventListener('change',cambiarTxtBloqu)

function cambiarTxtBloqu(){
    if (dtBloquChk.checked == true) {
        dtBloquTxt.textContent = "Bloqueo Activo"
    } else {
        dtBloquTxt.textContent = "Bloqueo Inactivo"
    }
}

//select que cambia el saldo pendiente segun la tarjeta seleccionada
let dtPagaTDes = document.querySelector("#txtPagarTDestino")
let dtPagaSSel = document.querySelector("#txtPagarSalPend")

dtPagaTDes.addEventListener('change',muestraSalPend)

function muestraSalPend(){
    dtPagaTDes.value
    let index = datosApp.TsCredito.findIndex(Cred => Cred.numTar == dtPagaTDes.value)
    dtPagaSSel.textContent = datosApp.TsCredito[index].verSalPendiente()
}



//vaciar los datos al arreglo datosApp
function llenarArreglo(aux){
    aux.Clientes.forEach(element => {datosApp.Clientes.push(new Cliente(element.nomCom,element.numCli,element.fechNac,element.direccion,element.dni,element.nipCli))})
    aux.Cuentas.forEach(element => {datosApp.Cuentas.push(new Cuenta(element.numCli,element.numCue,element.numTar,element.clabe,element.saldo,element.Mov))})
    aux.TarsDebito.forEach(element => {datosApp.TsDebito.push(new TarjetaDebito(element.numCli,element.numCue,element.numTar,element.fechVen,element.nipTar,element.estado))})
    aux.TarsCredito.forEach(element => {datosApp.TsCredito.push(new TarjetaCredito(element.numCli,element.numTar,element.fechVen,element.nipTar,element.estado,element.linCre,element.salPen))})
}

//cargar todos los datos del json
async function cargarJson(){
    const response = await fetch('./../json/datos.json')
    const datos = await response.json()
    llenarArreglo(datos)
    localStorage.setItem("dApp",JSON.stringify(datos))
    const data2 = JSON.parse(localStorage.getItem("dApp"))
    console.log(data2)
    console.log(numCli)
    console.log(datosApp.Clientes[indCli])
    console.log(datosApp.Cuentas)
    console.log("leyo del JSON")
}

//cargar los datos del localStorage
function cargarLocalStorage(){
    const datos = JSON.parse(localStorage.getItem("dApp"))
    llenarArreglo(datos)
    console.log(datos)
    console.log(numCli)
    console.log(datosApp.Clientes[indCli])
    console.log(datosApp.Cuentas)
    console.log("leyo del LocalStorage")
}



//funciones para buscar cuentas y tarjetas
function buscarCuentasCliente(ncli){
    return datosApp.Cuentas.filter(Cuenta => Cuenta.numCli == ncli)
}

function buscarTsDebitoCliente(ncli){
    return datosApp.TsDebito.filter(Debito => Debito.numCli == ncli)
}

function buscarTsCreditoCliente(ncli){
    return datosApp.TsCredito.filter(Credito => Credito.numCli == ncli)
}

function buscarSaldoCuenta(nCue){
    let index = datosApp.Cuentas.findIndex(Cuenta => Cuenta.numCue == nCue)
    return datosApp.Cuentas[index].verSaldo()
}

function buscarEstadoTarjeta(tipo,nTar){
    let index
    let estado
    if(tipo == "Debito"){
        index = datosApp.TsDebito.findIndex(Tarjeta => Tarjeta.numTar == nTar)
        estado = datosApp.TsDebito[index].verEstado()
    }else{
        index = datosApp.TsCredito.findIndex(Tarjeta => Tarjeta.numTar == nTar)
        estado = datosApp.TsCredito[index].verEstado()
    }
    return estado
}

function buscarNipTarjeta(tipo,nTar){
    let index
    let nip
    if(tipo == "Debito"){
        index = datosApp.TsDebito.findIndex(Tarjeta => Tarjeta.numTar == nTar)
        nip = datosApp.TsDebito[index].verNipTarjeta()
    }else{
        index = datosApp.TsCredito.findIndex(Tarjeta => Tarjeta.numTar == nTar)
        nip = datosApp.TsCredito[index].verNipTarjeta()
    }
    console.log(nip)
    return nip
}


//funciones para modificar el html segun el cliente
function mostrarCuentas(id, saldo){
    let div = document.createElement("div")
    div.classList.add("m-2","w-200px","float-left")
    div.innerHTML =
        "<button id=\"bt"+id+"\" class=\"w-100 btn btn-secondary d-flex flex-column align-items-center rounded-lg shadow\">"+
            "<i class=\"fa-solid fa-address-card fa-4x\"></i>"+
            "<p class=\"m-0 p-0 textoId\"> No. <span class=\"tipoId\">Cuenta</span>: <span class=\"numId\">"+id+"</span> </p>"+
            "<p class=\"m-0 p-0\"> Saldo: <span class=\"saldoId\">"+saldo+"</span> </p>"+
        "</button>"
    inf.append(div)
}

function mostrarDebito(id, saldo){
    let div = document.createElement("div")
    div.classList.add("m-2","w-200px","float-left")
    div.innerHTML =
        "<button id=\"bt"+id+"\" class=\"w-100 btn btn-secondary d-flex flex-column align-items-center rounded-lg shadow\">"+
            "<i class=\"fa-regular fa-credit-card fa-4x\"></i>"+
            "<p class=\"m-0 p-0 textoId\"> T. de <span class=\"tipoId\">Debito</span>: <span class=\"numId\">"+id+"</span> </p>"+
            "<p class=\"m-0 p-0\"> Saldo: <span class=\"saldoId\">"+saldo+"</span> </p>"+
        "</button>"
    inf.append(div)
}

function mostrarCredito(id, saldo){
    let div = document.createElement("div")
    div.classList.add("m-2","w-200px","float-left")
    div.innerHTML =
        "<button id=\"bt"+id+"\" class=\"w-100 btn btn-secondary d-flex flex-column align-items-center rounded-lg shadow\">"+
            "<i class=\"fa-regular fa-credit-card fa-4x\"></i>"+
            "<p class=\"m-0 p-0 textoId\"> T. de <span class=\"tipoId\">Credito</span>: <span class=\"numId\">"+id+"</span> </p>"+
            "<p class=\"m-0 p-0\"> Saldo: <span class=\"saldoId\">"+saldo+"</span> </p>"+
        "</button>"
    inf.append(div)
}

//funcion que muestra y pinta el html segun el usuario
function mostrarTarCueCliente(num){
    buscarCuentasCliente(num).forEach(Ccli => {mostrarCuentas(Ccli.numCue,Ccli.saldo)})
    buscarTsDebitoCliente(num).forEach(Tdcli => {mostrarDebito(Tdcli.numTar,buscarSaldoCuenta(Tdcli.numCue))})
    buscarTsCreditoCliente(num).forEach(Tccli => {mostrarCredito(Tccli.numTar,(Tccli.linCre-Tccli.salPen).toFixed(2))})
}

//cambiar datos de cuenta origen en los formularios modales
function cambianFormsModal(){
    dtTransOri.value = idTCActual
    dtTransSal.textContent = salTCActual
    dtBloquOri.value = idTCActual
    dtRecarOri.value = idTCActual
    dtRecarSal.textContent = salTCActual
    dtPagaTOri.value = idTCActual
    dtPagaTSal.textContent = salTCActual
    dtPagaSOri.value = idTCActual
    dtPagaSSal.textContent = salTCActual
    dtNipOrige.textContent = idTCActual
    if(tipTCActual != "Cuenta"){ 
        dtNipMostr.textContent = buscarNipTarjeta(tipTCActual,idTCActual)
    }
}


//cambiar estado de boton seleccionado
function selectTarOrCuen(){
    let btAct = inf.querySelector(".btn-primary")
    btAct.classList.remove("btn-primary")
    btAct.classList.add("btn-secondary")
    let btId = this.id
    btTCActual = inf.querySelector("#"+btId) 
    btTCActual.classList.remove("btn-secondary")
    btTCActual.classList.add("btn-primary")
    activaropciones(this.querySelector(".tipoId").textContent)
    sltc.textContent = this.querySelector(".textoId").textContent
    console.log(this.querySelector(".textoId").textContent)
    idTCActual = this.querySelector(".numId").textContent
    salTCActual = this.querySelector(".saldoId").textContent
    tipTCActual = this.querySelector(".tipoId").textContent
    cambianFormsModal()
    mostrarEstadoEnForm()
    console.log(idTCActual)
    console.log(salTCActual)
}

//activar opciones segun el boton seleccionado
function activaropciones(tipo){
    switch (tipo) {
        case "Cuenta":
            bttr.disabled = false
            btbd.disabled = true
            btta.disabled = false
            btpt.disabled = false
            btps.disabled = false
            btvn.disabled = true
            btec.disabled = false
            btmo.disabled = false
            bttr.parentNode.style.display = 'block'
            btbd.parentNode.style.display = 'none'
            btta.parentNode.style.display = 'block'
            btpt.parentNode.style.display = 'block'
            btps.parentNode.style.display = 'block'
            btvn.parentNode.style.display = 'none'
            btec.parentNode.style.display = 'block'
            btmo.parentNode.style.display = 'block'
            break;
        case "Debito":
            bttr.disabled = true
            btbd.disabled = false
            btta.disabled = true
            btpt.disabled = true
            btps.disabled = true
            btvn.disabled = false
            btec.disabled = true
            btmo.disabled = false
            bttr.parentNode.style.display = 'none'
            btbd.parentNode.style.display = 'block'
            btta.parentNode.style.display = 'none'
            btpt.parentNode.style.display = 'none'
            btps.parentNode.style.display = 'none'
            btvn.parentNode.style.display = 'block'
            btec.parentNode.style.display = 'none'
            btmo.parentNode.style.display = 'block'
            break;
        case "Credito":
            bttr.disabled = true
            btbd.disabled = false
            btta.disabled = true
            btpt.disabled = true
            btps.disabled = true
            btvn.disabled = false
            btec.disabled = false
            btmo.disabled = false
            bttr.parentNode.style.display = 'none'
            btbd.parentNode.style.display = 'block'
            btta.parentNode.style.display = 'none'
            btpt.parentNode.style.display = 'none'
            btps.parentNode.style.display = 'none'
            btvn.parentNode.style.display = 'block'
            btec.parentNode.style.display = 'block'
            btmo.parentNode.style.display = 'block'
            break;
        default:
            break;
    }
}


//cargar informacion del cliente actual al cargar la pagina
window.addEventListener("load",
async function cargarDatosUsuario(){
    //decide de donde tomar los datos
    if(localStorage.getItem("dApp")!=null){
        //si ya se cargaron los toma del localStorage
        cargarLocalStorage()
    }else{
        //si no se han cargado los carga y guarda en local
        await cargarJson()
    }

    //muestra los datos el usuario que inicio sesion
    nom.innerHTML = "Usuario: " + nomCli
    cli.innerHTML = "Cliente: " + numCli

    //busca y muestra en el html las cuentas y tarjetas segun el cliente
    mostrarTarCueCliente(numCli)
    
    //activa los botones de operaciones segun la primer tarjeta o cuenta que tenga el cliente y aplica el evento para que en cuanto se cambie de tarjeta o cuenta tambien cambien las opciones
    const botones = inf.querySelectorAll("button")
    botones.forEach(bt => {bt.addEventListener("click",selectTarOrCuen)})
    btTCActual = botones[0]
    btTCActual.classList.remove("btn-secondary")
    btTCActual.classList.add("btn-primary")
    idTCActual = btTCActual.querySelector(".numId").textContent
    salTCActual = btTCActual.querySelector(".saldoId").textContent
    tipTCActual = btTCActual.querySelector(".tipoId").textContent
    activaropciones(tipTCActual)
    sltc.textContent = btTCActual.querySelector(".textoId").textContent
    cambianFormsModal()
    mostrarEstadoEnForm()
    mostrarListaCreditos()
})
