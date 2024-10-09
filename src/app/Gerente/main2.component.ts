import { Component } from '@angular/core';
import {  RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-main2',
  standalone: true,
  imports: [RouterOutlet ,RouterLink,RouterLinkActive,],
  templateUrl: './main2.component.html',
  styleUrl: './main2.component.css'
})
export  default class Main2Component {

}
