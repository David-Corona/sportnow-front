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
  user: any = {
    // title: "",
    // description: "",
  };

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
    // this.resetForm();
    if (this.route.snapshot.paramMap.get('id')) {
      this.getUserToEdit();
    }
  }

  getUserToEdit(){
      this.nuevoUsuario = false;
      this.user = this.route.snapshot.data["user"].data;
  }

  // TODO
  editUser() {
    // const formData = new FormData();
    // if (this.file){
      // formData.append("avatar", this.file, this.file.name);
      // formData.append("name", this.user.name);
      // formData.append("email", this.user.email);
      // formData.append("name", this.user.name);

      // console.log(formData);
      // this.user.formData = formData;
      // console.log(this.user);

      this.adminService.editUser(this.user).subscribe({ //formdata
        next: (resp) => {
          console.log(resp);
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
    // }
  }

  editPhoto() {
    const formData = new FormData();
    if(this.file){
      formData.append("avatar", this.file, this.file.name);
      console.log(formData);
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
      next: (resp) => {
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






  // resetForm() {
  //   this.anEvent = {
  //     title: '',
  //     date: '',
  //     description: '',
  //     image: '',
  //     price: 0,
  //     lat: 0,
  //     lng: 0,
  //     address: ""
  //   };
  //   this.imageName = "";
  // }

}
