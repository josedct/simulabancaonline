class TarjetaDebito{
    constructor(numCli,numCue,numTar,fechVen,nipTar,estado){
        this.numCli = numCli
        this.numCue = numCue
        this.numTar = numTar
        this.fechVen = fechVen
        this.nipTar = nipTar
        this.estado = estado
    }

    verNumCliente(){
        return this.numCli
    }

    verNumCuenta(){
        return this.numCue
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

}