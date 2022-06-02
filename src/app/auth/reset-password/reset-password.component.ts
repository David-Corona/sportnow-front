import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
// import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  password: String = "";
  password2: String = "";
  token: String = "";

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("SportNow | Nueva Contraseña");
    this.resetForm();
    this.token = this.route.snapshot.paramMap.get('token')!;
    console.log(this.token);
  }

  resetPassword(){
    this.authService.resetPassword(this.password, this.token).subscribe({
      next: (resp) => {
        console.log(resp);
        // Swal.fire("¡Éxito!", "Contraseña actualizada correctamente.", "success");
        this.toastr.success('Contraseña restablecida correctamente');
        this.router.navigate(['/login']);
      },
      error: error => {
        console.error(error);
        // Swal.fire("Error", "Error al actualizar la contraseña.", "error");
        this.toastr.error('Error al actualizar la contraseña');
      }
    });
  }

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid,
    };
  }

  resetForm() {
    this.password = "";
    this.password2 = "";
  }

}
