import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export default class MainComponent {
  constructor(private router: Router){

  }
  ingresar(){
    this.router.navigateByUrl("admin");
  }

}
