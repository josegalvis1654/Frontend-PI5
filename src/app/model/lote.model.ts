export class Lote {

    id:number;
    idProducto:string;
    FechaEntrega:string;
    Estado:string;
    Cantidad:string;
    FechaCaducidad:string;
    Proveedor:string;

    constructor(){
        this.id=1;
        this.idProducto= '';
        this.FechaEntrega='';
        this.Estado='';
        this.Cantidad= '';
        this.FechaCaducidad='';
        this.Proveedor='';
    }
}

export class Proveedor{
    
    Id:number;
    nit:string;
    razonSocial:string;
    representanteLegal:string;
    direccion:string;
    telefono:string;
    vehiculoAsociado:string;

    constructor(){
        this.Id=1;
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
        this.nombre= 'Pera';
        this.tipo='';
        this.ubicacion='';
    }
}