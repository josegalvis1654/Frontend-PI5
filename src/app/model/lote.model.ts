export class Lote {

    id:string;
    idProducto:string;
    FechaEntrega:string;
    Estado:string;
    Cantidad:string;
    FechaCaducidad:string;
    Proveedor:string;

    constructor(){
        this.id='';
        this.idProducto= '';
        this.FechaEntrega='';
        this.Estado='';
        this.Cantidad= '';
        this.FechaCaducidad='';
        this.Proveedor='';
    }
}

export class Proveedor{
    
    Id:string;
    nit:string;
    razonSocial:string;
    representanteLegal:string;
    direccion:string;
    telefono:string;
    vehiculoAsociado:string;

    constructor(){
        this.Id='';
        this.nit= '';
        this.razonSocial='';
        this.representanteLegal='';
        this.direccion= '';
        this.telefono='';
        this.vehiculoAsociado='';
    }
}

export class Producto{

    Id:string;
    nombre:string;
    tipo:string;
    ubicacion:string;

    constructor(){
        this.Id='';
        this.nombre= '';
        this.tipo='';
        this.ubicacion='';
    }
}