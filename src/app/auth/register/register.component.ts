import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser = {
    name: "",
    email: "",
    password: "",
    latitude: 0,
    longitude: 0
  }
  passRep: string = "";
  @ViewChild('lngModel') lngModel!: NgModel;
  @ViewChild('latModel') latModel!: NgModel;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Registro | SportNow");
    this.resetForm();
    this.geolocate();
  }

  geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.newUser.latitude = position.coords.latitude;
        this.newUser.longitude = position.coords.longitude;
      }, () => {
        this.toastr.error('Error geolocalización');
        // inputs inválidos => Form invalido => submit desactivado
        this.latModel.control.setErrors({'incorrect': true});
        this.lngModel.control.setErrors({'incorrect': true});
      });
    } else {
      console.error();
    }
  }

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    if (ngModel === this.lngModel || ngModel === this.latModel){
      return { // valida sin ser "tocado"
        [validClass]: ngModel.valid,
        [errorClass]: ngModel.invalid,
      };
    } else { // sólo valida al ser "tocado"
      return {
        [validClass]: ngModel.touched && ngModel.valid,
        [errorClass]: ngModel.touched && ngModel.invalid,
      };
    }
  }

  createAccount() {
    this.authService.register(this.newUser).subscribe({
      next: (e) => {
        console.log(e);
        this.router.navigate(['/auth/login']);
        this.toastr.success('Cuenta creada correctamente');
      },
      error: error => {
        console.error(error);
        this.toastr.error('Error al crear la cuenta');
      }
    });
  }

  resetForm() {
    this.newUser = {
      name: "",
      email: "",
      password: "",
      latitude: 0,
      longitude: 0
    };
  }
}
