class Movimiento{
    constructor(fech, descrip, cantidad, tipo){
    this.fecha = fech
	this.descripcion = descrip
	this.importe = cantidad
	this.tipo = tipo
    }

    infoMovimiento(){
        return "<strong>Fecha</strong>:"+this.fecha+"<br><strong>Descripcion:</strong><br>"+this.descripcion+"<br><strong>Importe:</strong><span class=\"importe\">"+this.importe+"</span><br><strong>Tipo:</strong>"+this.tipo
    }

    infoEstado(){
        return "<tr><td>"+this.fecha+"</td><td>"+this.descripcion+"</td><td>"+this.tipo+"</td><td class=\"text-right importe\">"+this.importe+"</td></tr>"
    }
}

