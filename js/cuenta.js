class Cuenta{
    constructor(numCli,numCue,numTar,clabe,saldo){
        this.numCli = numCli
        this.numCue = numCue
        this.numTar = numTar
        this.clabe = clabe
        this.saldo = saldo
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
        this.saldo+=cantidad
    }
}