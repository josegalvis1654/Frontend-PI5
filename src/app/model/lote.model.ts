export class Lote {

    id:number;
    producto:number;
    fechaentrega:string;
    estado:number;
    cantidad:number;
    fechacaducidad:string;

    constructor(){
        this.id=0;
        this.producto= 0;
        this.fechaentrega='';
        this.estado=0;
        this.cantidad= 0;
        this.fechacaducidad='';
    }
}

export class Proveedor{
    
    id:number;
    nit:string;
    razon_social:string;
    representante_legal:string;
    direcion:string;
    telefono:number;
    vehiculo_asociado:string;

    constructor(){
        this.id=0;
        this.nit= '';
        this.razon_social='';
        this.representante_legal='';
        this.direcion= '';
        this.telefono=0;
        this.vehiculo_asociado='';
    }
}

export class Producto{

    id:number;
    nombre:string;
    tipo:number;
    ubicacion:number;

    constructor(){
        this.id=0;
        this.nombre= '';
        this.tipo=0;
        this.ubicacion=0;
    }
}