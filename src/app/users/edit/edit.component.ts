import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


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
    private renderer: Renderer2,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Editar Perfil | SportNow");
    this.user = this.route.snapshot.data["user"].data; //get the user from the router's data.
  }

  editProfile() {
    if (this.editProfileForm.form.valid && this.editProfileForm.form.dirty){
      this.usersService.saveProfile(this.user.name, this.user.email).subscribe({
        next: () => {
          this.toastr.success('Perfil actualizado correctamente');
          this.editProfileForm.controls["nameUser"].markAsUntouched();
          this.editProfileForm.controls["email"].markAsUntouched();
        },
        error: e => {
          console.error(e);
          this.toastr.error('Error al actualizar perfil');
        }
      });
    } else {
      this.toastr.error('Campos inválidos');
    }
  }

  editPassword() {
    if (this.editPasswordForm.form.valid){
      this.usersService.savePassword(this.user.password!).subscribe({
        next: () => {
          this.toastr.success('Contraseña actualizada correctamente');
          this.user.password = "";
          this.passwpordRep = "";
          this.editPasswordForm.controls["password"].markAsUntouched();
          this.editPasswordForm.controls["password2"].markAsUntouched();
        },
        error: e => {
          console.error(e);
          this.toastr.error('Error al actualizar contraseña');
        }
      });
    } else {
      this.toastr.error('Datos introducidos inválidos');
    }
  }

  // TODO
  editPhoto() {
    const formData = new FormData();
    formData.append("avatar", this.file, this.file.name);
    this.usersService.savePhoto(formData).subscribe({
      next: resp => {
        this.user.avatar = resp.data.avatar;
        this.newAvatar = "";
      },
      error: e => {
        console.error(e);
        this.toastr.error('Error al actualizar avatar');
      }
    });
  }

  // TODO
  loadImage(event: any): void {
    this.file = event.target.files[0];
    const reader = new FileReader();
    if (this.file && this.file.type.startsWith("image")) {
      reader.readAsDataURL(this.file);
    } else {
      this.toastr.error('Debe subir una imagen');
    }

    reader.addEventListener("load", () => {
      this.newAvatar = reader.result as string;
      this.renderer.removeClass(this.imgPreview.nativeElement,"d-none");
    });
  }

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid,
    };
  }

}
