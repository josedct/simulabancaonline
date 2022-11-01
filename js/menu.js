
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
let dtTransCan = document.querySelector("#txtTranCantidad")

//funciones de las operaciones
function transferir(){
    let error = 0
    let mensaje = ""
    //obtener datos para la transferencia
    let esCantidad = /^\d+((\.\d{2})|)$/ 
    let origen = idTCActual
    let destino = dtTransDes.value
    let cantidad = document.querySelector("#txtTranCantidad").value
    let concepto = document.querySelector("#txtTranConcepto").value
    let nombreRecep = dtTransRec.value
    //verificar que no sea la misma tarjeta o Clabe
    let indexO = datosApp.Cuentas.findIndex(cue => cue.numCue == origen)
    let auxTar = datosApp.Cuentas[indexO].numTar
    let auxCB = datosApp.Cuentas[indexO].clabe
    if(origen == destino || origen == auxTar || origen == auxCB)
    {
        error = 1
        mensaje += " No se puede transferir a la misma cuenta."
    }

    //verificar que el destino exista
    let long = destino.length
    let indexD = -1 
    if(long == 10 || long == 18 || long == 16){
        switch (long) {
            case 10:
                indexD = datosApp.Cuentas.findIndex(cue => cue.numCue == destino)
                break;
            case 18:
                indexD = datosApp.Cuentas.findIndex(cue => cue.clabe == destino)
                break;
            case 16:
                indexD = datosApp.Cuentas.findIndex(cue => cue.numTar == destino)
                break;
        }
        if (indexD == -1) {
            error = 1
            mensaje += " No se encontro la cuenta, tarjeta o cable."
        }
    }else{
        error = 1
        mensaje += " El destino no es No de cuenta, tarjeta o clabe."
    }
    //verificar que la cantidad sea positiva y mayor a cero
    if(cantidad == "" || cantidad <= 0 || !(esCantidad.test(cantidad))){
        error = 1
        mensaje += " La cantidad no es valida."
    }

    //verificar que el concepto no este vacio
    if(concepto == ""){
        error = 1
        mensaje += " El concepto esta vacio."
    }

    //verificar el que el saldo origen sea suficiente
    if(datosApp.Cuentas[indexO].saldo < cantidad){
        error = 1
        mensaje += " El saldo es insuficiente en la cuenta origen."
    }

    if(error == 0){
        //realizar y registrar la transferencia
        let fechaMov = new Date()
        datosApp.Cuentas[indexO].regCargo(cantidad)
        datosApp.Cuentas[indexO].Mov.push(new Movimiento(fechaMov.getDate()+"/"+(fechaMov.getMonth()+1)+"/"+fechaMov.getFullYear(),concepto+" Destinatario:"+nombreRecep,parseFloat(cantidad),"cargo"))
        datosApp.Cuentas[indexD].regIngreso(cantidad)
        datosApp.Cuentas[indexD].Mov.push(new Movimiento(fechaMov.getDate()+"/"+(fechaMov.getMonth()+1)+"/"+fechaMov.getFullYear(),concepto+" Origen:"+nomCli,parseFloat(cantidad),"ingreso"))

        //actualizar el arreglo de datos
        localStorage.setItem("dApp",JSON.stringify(datosApp))
        
        //actualizar el html de las tarjetas y cuentas
        let btidtem = btTCActual.id
        inf.innerHTML = ""
        mostrarTarCueCliente(numCli)
        const botones = inf.querySelectorAll("button")
        botones.forEach(bt => {bt.addEventListener("click",selectTarOrCuen)})
        btTCActual = inf.querySelector("#"+btidtem) 
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

        //notificar del cambio y limpiar los imput
        mensaje = "Transferencia realizada con exito <br> Cuenta origen :"+origen +"<br>Receptor: "+ nombreRecep+"<br>Importe: "+cantidad
        dtTransDes.value = ""
        document.querySelector("#txtTranCantidad").value = ""
        document.querySelector("#txtTranConcepto").value = ""
        dtTransRec.value =""
        alerta("success", mensaje)
    } else{
        //notificar del error
        dtTransDes.value = ""
        document.querySelector("#txtTranCantidad").value = ""
        document.querySelector("#txtTranConcepto").value = ""
        dtTransRec.value =""
        alerta("error",mensaje)
    }
    modTransferir.modal('hide')
}

function bloqdes(){
    let mensaje = ""
    //obtener los datos necesarios
    let origen = idTCActual
    let tipoO = tipTCActual
    let indexO
    let bloquear = dtBloquChk.checked
    
    //activar o inactivar la tarjeta
    switch (tipoO) {
        case "Debito":
            indexO = datosApp.TsDebito.findIndex(tar => tar.numTar == origen)
            if(bloquear){
                datosApp.TsDebito[indexO].establecerEstado("inactiva")
                mensaje = "Tarjeta: "+origen+"<br>Bloqueada"
            }else{
                datosApp.TsDebito[indexO].establecerEstado("activa")
                mensaje = "Tarjeta: "+origen+"<br>Desbloqueada"
            }
            break;
        case "Credito":
            indexO = datosApp.TsCredito.findIndex(tar => tar.numTar == origen)
            if(bloquear){
                datosApp.TsCredito[indexO].establecerEstado("inactiva")
                mensaje = "Tarjeta: "+origen+"<br>Bloqueada"
            }else{
                datosApp.TsCredito[indexO].establecerEstado("activa")
                mensaje = "Tarjeta: "+origen+"<br>Desbloqueada"
            }
            break;
    }
    
    //actualizar el arreglo de datos
    localStorage.setItem("dApp",JSON.stringify(datosApp))

    //actualizar el html de las tarjetas y cuentas
    let btidtem = btTCActual.id
    inf.innerHTML = ""
    mostrarTarCueCliente(numCli)
    const botones = inf.querySelectorAll("button")
    botones.forEach(bt => {bt.addEventListener("click",selectTarOrCuen)})
    btTCActual = inf.querySelector("#"+btidtem) 
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

    alerta("success", mensaje)
    modBloqDes.modal('hide')
}

function recargar(){
    let error = 0
    let mensaje = ""
    let patronTel = /^\d{10}$/
    let esCantidad = /^\d+((\.\d{2})|)$/
    
    //obtener los datos
    let fechaMov = new Date()
    let origen = idTCActual
    let numero = document.querySelector("#txtRecarNumTel").value
    let recarga = document.querySelector("#txtRecarCantSaldo").value
    let indexO = datosApp.Cuentas.findIndex(cue => cue.numCue == origen)

    //verificar un numero valido
    if(!(patronTel.test(numero))){
        error = 1
        mensaje += "El numero telefonico no es valido."
    }

    //verificar que tenga saldo suficiente en la cuenta
    if(datosApp.Cuentas[indexO].saldo < recarga){
        error = 1
        mensaje += " El saldo en la cuenta es insuficiente."
    }
    
    //verificar si es una cantidad valida el saldo
    if(!(esCantidad.test(recarga))){
        error = 1
        mensaje += " El saldo a recargar no es valido"
    }

    //realizar la recarga y guardar el movimiento
    if(error == 0){
        datosApp.Cuentas[indexO].regCargo(recarga)
        datosApp.Cuentas[indexO].Mov.push(new Movimiento(fechaMov.getDate()+"/"+(fechaMov.getMonth()+1)+"/"+fechaMov.getFullYear(),"Recarga de Saldo, Numero: "+numero,parseFloat(recarga),"cargo"))

        //actualizar el arreglo de datos
        localStorage.setItem("dApp",JSON.stringify(datosApp))

        //actualizar el html de las tarjetas y cuentas
        let btidtem = btTCActual.id
        inf.innerHTML = ""
        mostrarTarCueCliente(numCli)
        const botones = inf.querySelectorAll("button")
        botones.forEach(bt => {bt.addEventListener("click",selectTarOrCuen)})
        btTCActual = inf.querySelector("#"+btidtem) 
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

        mensaje = "Recarga realizada<br>Numero: "+numero+"<br>Saldo: $"+recarga

        document.querySelector("#txtRecarNumTel").value = ""
        document.querySelector("#txtRecarCantSaldo").selectedIndex = 0
        alerta("success", mensaje)
    }else{
        document.querySelector("#txtRecarNumTel").value = ""
        document.querySelector("#txtRecarCantSaldo").selectedIndex = 0
        alerta("error",mensaje)
    }
    modTiempo.modal('hide')
}

function pagarTarjeta(){
    let mensaje = ""
    let error = 0
    let esCantidad = /^\d+((\.\d{2})|)$/
    let esNumTar = /^\d{16}$/
    let fechaMov = new Date()

    //obtener datos
    let origen = idTCActual
    let destinoT = document.querySelector("#txtPagarTDestino").value
    let indexO = datosApp.Cuentas.findIndex(cue => cue.numCue == origen) 
    let cantidadP = document.querySelector("#txtPagarTPago").value 
    let indexT 
    let saldoT

    if(!(esCantidad.test(cantidadP))){
        error = 1
        mensaje += "La cantidad a pagar no es valida."
    }

    if(!(esNumTar.test(destinoT))){
        error = 1
        mensaje += " El numero de tarjeta no es valido."
    }

    if(datosApp.Cuentas[indexO].verSaldo() < saldoT){
        error = 1
        mensaje += " El saldo de la cuenta es insuficiente para pagar."
    }
    //realizar el pago de tarjeta y registrar el movimiento
    if(error == 0){
        indexT = datosApp.TsCredito.findIndex(tar => tar.numTar == destinoT)
        saldoT = parseFloat(datosApp.TsCredito[indexT].verSalPendiente())

        if(cantidadP > saldoT){
            mensaje += "La cantidad a pagar era mayor que el saldo pendiente, solo se tomo el total del saldo pendiente."
            cantidadP = saldoT
        }

        datosApp.Cuentas[indexO].regCargo(cantidadP)
        datosApp.Cuentas[indexO].Mov.push(new Movimiento(fechaMov.getDate()+"/"+(fechaMov.getMonth()+1)+"/"+fechaMov.getFullYear(),"Pago de tarjeta: "+destinoT,parseFloat(cantidadP),"cargo"))
        datosApp.TsCredito[indexT].regPago(cantidadP)
        datosApp.TsCredito[indexT].Mov.push(new Movimiento(fechaMov.getDate()+"/"+(fechaMov.getMonth()+1)+"/"+fechaMov.getFullYear(),"Abono al saldo pendiente de: "+idTCActual,parseFloat(cantidadP),"ingreso"))

        //actualizar el arreglo de datos
        localStorage.setItem("dApp",JSON.stringify(datosApp))

        //actualizar el html de las tarjetas y cuentas
        let btidtem = btTCActual.id
        inf.innerHTML = ""
        mostrarTarCueCliente(numCli)
        const botones = inf.querySelectorAll("button")
        botones.forEach(bt => {bt.addEventListener("click",selectTarOrCuen)})
        btTCActual = inf.querySelector("#"+btidtem) 
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

        mensaje +=" Pago realizado<br> Tarjeta: "+destinoT+"<br>Cantidad: "+cantidadP

        document.querySelector("#txtPagarTPago").value = ""
        alerta("success",mensaje)
    }else{
        document.querySelector("#txtPagarTPago").value = ""
        alerta("error",mensaje)
    }
    
    modPTarjeta.modal('hide')
}

function pagarServicio(){
    let error = 0
    let mensaje = ""
    let esCantidad = /^\d+((\.\d{2})|)$/
    let esRef = /^\d{17}$/
    let fechaMov = new Date()

    //obtener datos
    let origen = idTCActual
    let referencia = document.querySelector("#txtPagarSReferencia").value
    let cantidad = document.querySelector("#txtPagarSCantidad").value
    let concepto = document.querySelector("#txtPagorSConcepto").value
    let indexO = datosApp.Cuentas.findIndex(cue => cue.numCue == origen)

    //validar referencia sea numerica
    if(!(esRef.test(referencia)))
    {
        error = 1
        mensaje += "No es una referencia valida."
    }

    //validar que la cantidad se correcta
    if(!(esCantidad.test(cantidad))){
        error = 1
        mensaje += " La cantidad ingresada no es valida."
    }

    //validar que el concepto no este vacio
    if(concepto == "" || concepto.length == 0){
        error = 1
        mensaje += " El concepto esta vacio."
    }

    //realizar el pago y notificar
    if (error == 0) {
        datosApp.Cuentas[indexO].regCargo(cantidad)
        datosApp.Cuentas[indexO].Mov.push(new Movimiento(fechaMov.getDate()+"/"+(fechaMov.getMonth()+1)+"/"+fechaMov.getFullYear(),"Pago de Servicio, Referencia: "+referencia+", Concepto:"+concepto,parseFloat(cantidad),"cargo"))

        //actualizar el arreglo de datos
        localStorage.setItem("dApp",JSON.stringify(datosApp))

        //actualizar el html de las tarjetas y cuentas
        let btidtem = btTCActual.id
        inf.innerHTML = ""
        mostrarTarCueCliente(numCli)
        const botones = inf.querySelectorAll("button")
        botones.forEach(bt => {bt.addEventListener("click",selectTarOrCuen)})
        btTCActual = inf.querySelector("#"+btidtem) 
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

        mensaje += "Pago de Servicio realizado<br>Referencia: "+referencia+"<br>Concepto: "+concepto+"<br>Importe: "+cantidad

        document.querySelector("#txtPagarSReferencia").value = ""
        document.querySelector("#txtPagarSCantidad").value = ""
        document.querySelector("#txtPagorSConcepto").value = ""
        alerta("success",mensaje)
    } else {
        document.querySelector("#txtPagarSReferencia").value = ""
        document.querySelector("#txtPagarSCantidad").value = ""
        document.querySelector("#txtPagorSConcepto").value = ""
        alerta("error",mensaje)
    }
    modPServicio.modal('hide')
}

function verNip(){
    
    modVernip.modal('hide')
}

function estadoCuenta(){
    
    modEstado.modal('hide')
}

function movimientos(){
    
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
