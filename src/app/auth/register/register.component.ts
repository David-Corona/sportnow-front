import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

// import { User } from '../interfaces/user';
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
    // avatar: new FormData(),
    latitude: 0,
    longitude: 0
  }
  passRep: string = "";
  @ViewChild('lngModel') lngModel!: NgModel;
  @ViewChild('latModel') latModel!: NgModel;
  @ViewChild('imgPreview') imgPreview!: ElementRef;
  // file:any;
  // stringAvatar: string = "";

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private router: Router,
    // private renderer: Renderer2,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("SportNow | Registro");
    this.resetForm();
    this.geolocate();
  }

  // show coords if geolocation allowed or show message if not
  geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.newUser.latitude = position.coords.latitude;
        this.newUser.longitude = position.coords.longitude;
      }, () => {
        Swal.fire("Error Geolocalización",
        "No se han podido obtener las coordenadas.<br/>" + "Permita la geolocalización para crear una cuenta.",
        "error");
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

  // if the form is valid, the button to create account will activate.
  createAccount() {
    // const formData = new FormData();
    // this.newUser.avatar.append("avatar", this.file, this.file.name);
    // this.newUser.avatar =  this.file;
    this.authService.register(this.newUser).subscribe({
      next: (e) => {
        console.log(e);
        this.router.navigate(['/login']);
        this.toastr.success('Cuenta creada correctamente');
      },
      error: error => {
        console.error(error);
        this.toastr.success('Error al crear la cuenta');
        // Swal.fire("Error",
        // "There was an error creating the account.<br/>" + "Check that the email isn't already in use.",
        // "error");
      }
    });
  }

  // loadImage(event: any): void {
  //   this.file = event.target.files[0];
  //   const reader = new FileReader();
  //   console.log(this.file);
  //   if (this.file && this.file.type.startsWith("image")) { // checks there is a file and that it's an image.
  //     reader.readAsDataURL(this.file);
  //   } else {
  //     // Swal.fire("Error!",
  //     // "You must upload an image.",
  //     // "error");
  //   }

  //   reader.addEventListener("load", () => {
  //     this.stringAvatar = reader.result as string;

  //     // remove class d-none to show preview
  //     this.renderer.removeClass(this.imgPreview.nativeElement,"d-none");
  //   });
  // }

  resetForm() {
    this.newUser = {
      name: "",
      email: "",
      password: "",
      // avatar: new FormData(),
      latitude: 0,
      longitude: 0
    };
  }
}
