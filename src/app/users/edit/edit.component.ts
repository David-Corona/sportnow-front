


import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm, NgModel } from '@angular/forms';
import { EMPTY, of } from 'rxjs';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {

  user: User = {
    name: "",
    email: "",
    avatar: "",
    latitude: 0,
    longitude: 0
  }
  passwpordRep: string = "";
  @ViewChild('editPasswordForm') editPasswordForm!: NgForm;
  @ViewChild('editProfileForm') editProfileForm!: NgForm;
  @ViewChild('imgPreview') imgPreview!: ElementRef;
  newAvatar: string = "";
  file:any;

  constructor(
    private titleService: Title,
    private usersService: UserService,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Editar Perfil | SportNow");
    this.user = this.route.snapshot.data["user"].data; //get the user from the router's data.
    console.log(this.user);
  }


  editProfile() {
    if (this.editProfileForm.form.valid && this.editProfileForm.form.dirty){ // is valid and has been modified
      this.usersService.saveProfile(this.user.name, this.user.email).subscribe({
        next: () => {
          Swal.fire("Perfil actualizado",
          "Su perfil se ha actualizado correctamente",
          "success");
          this.editProfileForm.controls["nameUser"].markAsUntouched();
          this.editProfileForm.controls["email"].markAsUntouched();
        },
        error: error => {
          console.error(error);
          Swal.fire("¡Error!",
          "El perfil no ha podido ser editado, comprueba que el email no está en uso.",
          "error");
        }
      });
    } else {
      Swal.fire("¡Error!",
      "Los campos no son válidos o no han sido modificados.",
      "error");
    }
  }

  // edit the password
  editPassword() {
    if (this.editPasswordForm.form.valid){
      this.usersService.savePassword(this.user.password!).subscribe({
        next: () => {
          Swal.fire("Contraseña actualizada",
          "La contraseña ha sido actualizada correctamente.",
          "success");
          this.user.password = "";
          this.passwpordRep = "";
          // mark as untouched => doesn't show errors after clean
          this.editPasswordForm.controls["password"].markAsUntouched();
          this.editPasswordForm.controls["password2"].markAsUntouched();
        },
        error: error => {
          console.error(error);
          Swal.fire("¡Error!",
          "La contraseña no se ha podido modificar.",
          "error");
        }
      });
    } else {
      Swal.fire("¡Error!",
      "Los datos introducidos no son válidos.",
      "error");
    }
  }

  //  updates the photo/avatar
  editPhoto() {
    const formData = new FormData();
    formData.append("avatar", this.file, this.file.name);
    console.log(formData);
    this.usersService.savePhoto(formData).subscribe({
      next: resp => {
        console.log(resp);
        this.user.avatar = resp.data.avatar;
        this.newAvatar = "";
      },
      error: error => {
        console.error(error);
        // Swal.fire("Error!", "The introduced input is invalid.", "error");
      }
    });
  }

  loadImage(event: any): void {
    this.file = event.target.files[0];
    const reader = new FileReader();
    if (this.file && this.file.type.startsWith("image")) {
      reader.readAsDataURL(this.file);
    } else {
      Swal.fire("¡Error!", "Debe subir una imagen", "error");
    }

    reader.addEventListener("load", () => {
      this.newAvatar = reader.result as string;
      this.renderer.removeClass(this.imgPreview.nativeElement,"d-none");
    });

  }


  //only validates when it has been touched
  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid,
    };
  }

}
