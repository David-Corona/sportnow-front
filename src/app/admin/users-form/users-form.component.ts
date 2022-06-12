import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { NgModel, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { almacenamiento } from 'src/constants'


@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {

  urlAlmacenamiento = almacenamiento.url;
  user: any = {};

  @ViewChild('userForm') userForm!: NgForm;
  nuevoUsuario: boolean = true;
  passRep: string = "";

  @ViewChild('imgPreview') imgPreview!: ElementRef;
  file:any;
  newAvatar: string = "";

  constructor(
    private titleService: Title,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Admin Usuario | SportNow");
    if (this.route.snapshot.paramMap.get('id')) {
      this.getUserToEdit();
    }
  }

  getUserToEdit(){
    this.nuevoUsuario = false;
    this.user = this.route.snapshot.data["user"].data;
  }

  editUser() {
    this.adminService.editUser(this.user).subscribe({
      next: () => {
        this.user.password = "";
        this.passRep = "";
        this.userForm.form.markAsUntouched();
        this.toastr.success('Usuario editado correctamente');
      },
      error: error => {
        console.error(error);
        this.toastr.error('Error al editar el usuario');
      }
    });
  }

  editPhoto() {
    const formData = new FormData();
    if(this.file){
      formData.append("avatar", this.file, this.file.name);
      this.adminService.savePhoto(this.user.id, formData).subscribe({
        next: resp => {
          this.toastr.success('Avatar actualizado correctamente');
          this.user.avatar = resp.data.avatar;
          this.newAvatar = "";
        },
        error: e => {
          console.error(e);
          this.toastr.error('Error al actualizar avatar');
        }
      });
    }
  }

  loadImage(event: any): void {
    this.userForm.form.markAsDirty();
    this.file = event.target.files[0];
    const reader = new FileReader();
    if (this.file && this.file.type.startsWith("image")) {
      reader.readAsDataURL(this.file);
    } else {
      this.toastr.error('Debes subir una imagen');
    }

    reader.addEventListener("load", () => {
      this.newAvatar = reader.result as string;
      this.renderer.removeClass(this.imgPreview.nativeElement,"d-none");
    });
  }

  deleteUser() {
    this.adminService.deleteUser(this.user.id).subscribe({
      next: () => {
        this.router.navigate(['/admin/usuarios'])
        this.toastr.success('Usuario eliminado correctamente');
      },
      error: error => {
        console.error(error);
        this.toastr.error('Error al eliminar el usuario');
      }
    });
  }

  setUser() {
    this.adminService.createUser(this.user).subscribe({
      next: () => {
        this.router.navigate(['/admin/usuarios'])
        this.toastr.success('Usuario creado correctamente');
      },
      error: error => {
        console.error(error);
        this.toastr.error('Error al crear el usuario');
      }
    });
  }

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid,
    };
  }

}
