import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email: String = "";

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Contraseña Olvidada | SportNow");
    this.email = "";
  }

  requestReset(){
    this.authService.recoverPassword(this.email).subscribe({
      next: () => {
        this.toastr.success('Email enviado correctamente');
      },
      error: error => {
        console.error(error);
        this.toastr.error('Error al enviar el email');
      }
    });
  }
}
