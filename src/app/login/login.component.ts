import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService,private router: Router) {}

  ingresar(): void {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        console.log('Login successful', response);
        if (response.grupo=="Gerente"){
          this.router.navigateByUrl("Gerente");
        }
        else {
          this.router.navigateByUrl("Admin");
        }
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
}
