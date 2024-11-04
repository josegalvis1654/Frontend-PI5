import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Lote } from '../model/lote.model';
import { LoteService } from '../services/lote.service'; // Importa el servicio

@Component({
  selector: 'app-guardar-lote',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './guardar-lote.component.html',
  styleUrl: './guardar-lote.component.css'
})
export default class GuardarLoteComponent implements OnInit {
  loteForm: FormGroup = new FormGroup({});
  loteObj: Lote = new Lote();
  loteList: Lote[] = [];
  action: string = "1";
  filtrar: string = '';
  infomostrar: any;

  constructor(private loteService: LoteService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.cargarLotes();
  }

  createForm() {
    this.loteForm = new FormGroup({
      id: new FormControl(this.loteObj.id),
      idProducto: new FormControl(this.loteObj.idProducto),
      FechaEntrega: new FormControl(this.loteObj.FechaEntrega),
      Estado: new FormControl(this.loteObj.Estado),
      Cantidad: new FormControl(this.loteObj.Cantidad),
      FechaCaducidad: new FormControl(this.loteObj.FechaCaducidad),
      Proveedor: new FormControl(this.loteObj.Proveedor),
    });
  }

  cargarLotes() {
    this.loteService.obtenerLotes().subscribe(
      (lotes) => {
        this.loteList = lotes;
        this.infomostrar = this.loteList;
      },
      (error) => {
        console.error('Error al cargar lotes', error);
      }
    );
  }

  Guardar() {
    if (this.action === "1") {
      this.loteService.crearLote(this.loteForm.value).subscribe(
        (response) => {
          this.loteList.unshift(response);
          this.infomostrar = this.loteList;
          this.loteObj = new Lote();
          this.createForm();
        },
        (error) => {
          console.error('Error al crear lote', error);
        }
      );
    } else {
      this.Modificar();
    }
  }

  Editar(item: Lote) {
    this.loteObj = item;
    this.createForm();
    this.setAction("2");
  }

  setAction(action: string) {
    this.action = action;
  }

  Modificar() {
    this.loteService.actualizarLote(this.loteForm.controls['id'].value, this.loteForm.value).subscribe(
      (response) => {
        const index = this.loteList.findIndex(l => l.id === response.id);
        if (index !== -1) {
          this.loteList[index] = response;
        }
        this.infomostrar = this.loteList;
        this.loteObj = new Lote();
        this.createForm();
      },
      (error) => {
        console.error('Error al actualizar lote', error);
      }
    );
  }

  deleteInfo(event: any, id: number) {
    if (confirm("Deseas eliminar este dato?")) {
      this.loteService.eliminarLote(id).subscribe(
        () => {
          this.loteList = this.loteList.filter((obj) => obj.id !== id);
          this.infomostrar = this.loteList;
        },
        (error) => {
          console.error('Error al eliminar lote', error);
        }
      );
    }
  }

  filter(event: any) {
    this.infomostrar = this.loteList.filter((obj) => {
      return obj.idProducto.toLocaleLowerCase().indexOf(event.toLocaleLowerCase()) > -1;
    });
  }
}

