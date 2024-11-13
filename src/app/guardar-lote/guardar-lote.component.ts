import { compileOpaqueAsyncClassMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Lote, Proveedor } from '../model/lote.model';
import { LoteService } from '../services/lote.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-guardar-lote',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './guardar-lote.component.html',
  styleUrl: './guardar-lote.component.css'
})
export default class GuardarLoteComponent implements OnInit{
  loteForm:FormGroup =new FormGroup({});
  
  employeeObj: Lote= new Lote();
  
  employeeList: Lote[] = [];
  
  action: string;
  
  filtrar:string;
  infomostrar: any;
  constructor(private loteService:LoteService){
    
    this.createForm();
    
    
    this.filtrar='';
    this.action = "1";
    this.infomostrar = this.employeeList;
  }
  
  ngOnInit(){
    this.loteService.getLotes().subscribe((data)=>{
      this.employeeList = data;
      this.infomostrar =data;
    });
  }
  
  createForm(){
    this.loteForm=new FormGroup({
      id:new FormControl(this.employeeObj.id),
      producto:new FormControl(this.employeeObj.producto),
      fechaentrega:new FormControl(this.employeeObj.fechaentrega),
      estado:new FormControl(this.employeeObj.estado),
      cantidad:new FormControl(this.employeeObj.cantidad),
      fechacaducidad:new FormControl(this.employeeObj.fechacaducidad),
      proveedor:new FormControl(this.employeeObj.proveedor),
    })
  }




  filter(event: any){
    this.loteService.getLotes().subscribe((data)=>{
        this.infomostrar=this.employeeList.filter((obj:any)=>{
          return obj.producto.toLocaleLowerCase().indexOf(event.toLocaleLowerCase()) > -1;
      });
    });
  }

  ordAsc(){
    this.employeeList=this.infomostrar.slice();
    this.employeeList.sort((a,b)=> a.id - b.id );
    console.log('lista Ordenad', this.employeeList);
    console.log('lista original',this.infomostrar);
  }

  ordDsc(){
    this.employeeList=this.infomostrar.slice();
    this.employeeList.sort((a,b)=> b.id - a.id);
    console.log('lista Desordenada', this.employeeList);
    console.log('lista original',this.infomostrar);
  }

  deleteInfo(event:any, id:any){
    if(confirm("Deseas eliminar este dato?"))
    {
      this.loteService.eliminarLote(id).subscribe(()=>{
        this.infomostrar= this.infomostrar.filter((obj:any)=>{
          return obj.id != id;
      })
      });
      this.infomostrar = this.employeeList;
      this.ngOnInit();
    }
  }

  Guardar() {
    this.loteService.crearLote(this.loteForm.value).subscribe({
        next: (response:any) => {
            // Agregar el nuevo lote a la lista local con los datos de la respuesta
            this.employeeList.unshift(response.lote);
            this.employeeObj = new Lote(); // Reiniciar el formulario
            this.infomostrar = this.employeeList; // Actualizar la vista
            this.createForm(); // Reiniciar el formulario para futuras entradas
        },
        error: (err) => {
            console.error('Error al guardar el lote:', err);
        }
    });
  }


  Editar(item:Lote){
    this.employeeObj =item;
    this.createForm();
    this.setAction("2");
  }

  setAction(action: string){
    this.action = action;
  }
  
  Modificar() {
    const updatedData = {
      id: this.loteForm.controls['id'].value,
      producto: this.loteForm.controls['producto'].value,
      fechaentrega: this.loteForm.controls['fechaentrega'].value,
      estado: this.loteForm.controls['estado'].value,
      cantidad: this.loteForm.controls['cantidad'].value,
      fechacaducidad: this.loteForm.controls['fechacaducidad'].value,
      proveedor: this.loteForm.controls['proveedor'].value,
    };

    this.loteService.actualizarLote(updatedData.id, updatedData).subscribe({
        next: (response) => {
            // Actualizar el registro en la lista local después de una respuesta exitosa
            const record = this.employeeList.find(m => m.id === updatedData.id);
            if (record) {
              Object.assign(record, response); // Actualiza el objeto con los datos devueltos por el servidor
              this.ngOnInit();
            }
            this.employeeObj = new Lote();
            this.createForm(); // Reinicia el formulario
        },
        error: (err) => {
            console.error('Error al modificar el lote:', err);
        }
    });
  }


}
