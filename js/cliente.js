class Cliente{
    constructor(nomCom,numCli,fechNac,direccion,dni,nipCli){
        this.nomCom = nomCom
        this.numCli = numCli
        this.fechNac = fechNac
        this.direccion = direccion
        this.dni = dni
        this.nipCli = nipCli
    }
    
    verNombre(){
        return this.nomCom
    }

    verNumCliente(){
        return this.numCli
    }

    verFechNac(){
        return this.fechNac
    }

    verDireccion(){
        return this.direccion
    }

    verDni(){
        return this.dni
    }

    verNipCliente(){
        return this.nipCli
    }
}