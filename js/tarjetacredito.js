class TarjetaCredito{
    constructor(numCli,numTar,fechVen,nipTar,estado,linCre,salPen){
        this.numCli = numCli
        this.numTar = numTar
        this.fechVen = fechVen
        this.nipTar = nipTar
        this.estado = estado
        this.linCre = linCre
        this.salPen = salPen
    }

    verNumCliente(){
        return this.numCli
    }

    verNumTarjeta(){
        return this.numTar
    }

    verFechVencimiento(){
        return this.fechVen
    }

    verNipTarjeta(){
        return this.nipTar
    }

    verEstado(){
        return this.estado
    }

    verLinCredito(){
        return this.linCre
    }

    verSalPendiente(){
        return this.salPen
    }

    regCargo(cantidad){
        this.salPen+=cantidad
    }

    regPago(cantidad){
        this.salPen-=cantidad
    }
}