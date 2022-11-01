class Cuenta{
    constructor(numCli,numCue,numTar,clabe,saldo,mov){
        this.numCli = numCli
        this.numCue = numCue
        this.numTar = numTar
        this.clabe = clabe
        this.saldo = saldo
        this.Mov = []
        mov.forEach(elem => {
           this.Mov.push(new Movimiento(elem.fecha,elem.descripcion,elem.importe,elem.tipo)) 
        });
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

    verClabe(){
        return this.clabe
    }

    verSaldo(){
        return this.saldo
    }

    regCargo(cantidad){
        this.saldo-=cantidad
    }

    regIngreso(cantidad){
        this.saldo += parseFloat(cantidad)
    }
}