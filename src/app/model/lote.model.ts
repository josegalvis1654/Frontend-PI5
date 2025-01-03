export class Lote {

    id:number;
    producto:number;
    fechaentrega?:Date;
    estado:number;
    cantidad:number;
    fechacaducidad?:Date;
    proveedor:number;

    constructor(){
        this.id=0;
        this.producto=0;
        this.estado=0;
        this.cantidad= 0;
        this.proveedor=0;
        
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

export class Ubicacion{
    id:number;
    ubicacion:string;
    constructor(){
        this.id=0;
        this.ubicacion='';
    }
}
export class Tipo{
    id:number;
    tipo:string;
    constructor(){
        this.id=0;
        this.tipo='';
    }
}
export class Estado{
    id:number;
    estado:string;
    constructor(){
        this.id=0;
        this.estado='';
    }
}