class TarjetaCredito{
    constructor(numCli,numTar,fechVen,nipTar,estado,linCre,salPen,mov){
        this.numCli = numCli
        this.numTar = numTar
        this.fechVen = fechVen
        this.nipTar = nipTar
        this.estado = estado
        this.linCre = linCre
        this.salPen = salPen
        this.Mov = []
        mov.forEach(elem => {
           this.Mov.push(new Movimiento(elem.fecha,elem.descripcion,elem.importe,elem.tipo)) 
        });
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

    establecerEstado(actdes){
        this.estado =actdes
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