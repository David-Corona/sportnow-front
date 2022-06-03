import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
// import Swal from 'sweetalert2';
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
      next: (resp) => {
        console.log(resp);
        this.toastr.success('Email enviado correctamente');
        // Swal.fire("¡Éxito!",
        // "Email enviado correctamente.<br/>" + "Acceda al email para restablecer su contraseña.",
        // "success");
      },
      error: error => {
        console.error(error);
        this.toastr.error('Error al enviar el email');
        // Swal.fire("Error",
        // "No se ha podido enviar el email a la dirección introducida.<br/>" + "Asegúrese de que el email es correcto.",
        // "error");
      }
    });
  }
}
