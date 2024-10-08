import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main2',
  standalone: true,
  imports: [],
  templateUrl: './main2.component.html',
  styleUrl: './main2.component.css'
})
export class Main2Component {
  constructor(private router:Router){

  }
  page(){
    this.router.navigate(['/ConsultarLotes']);
  }
  

}
