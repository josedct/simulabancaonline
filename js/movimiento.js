class Movimiento{
    constructor(fech, descrip, cantidad, tipo){
    this.fecha = fech
	this.descripcion = descrip
	this.importe = cantidad
	this.tipo = tipo
    }

    infoMovimiento()
    {
        return "Fecha: "+this.fecha+" Descripcion: "+this.descripcion+" Importe: "+this.importe+" Tipo: "+this.tipo
    }
}

