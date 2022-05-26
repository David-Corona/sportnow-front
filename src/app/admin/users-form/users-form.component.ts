import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { NgModel, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {

  user: any = {
    // title: "",
    // description: "",
    // price: 0,
    // image: "",
    // date: "",
    // lat: 0,
    // lng: 0,
    // role: null
  };

  // newUser = {
  //   name: "",
  //   email: "",
  //   password: "",
  //   // avatar: new FormData(),
  //   latitude: 0,
  //   longitude: 0
  // }

  @ViewChild('userForm') userForm!: NgForm;
  nuevoUsuario: boolean = true;
  passRep: string = "";

  constructor(
    private titleService: Title,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("SportNow | Admin Usuario");
    // this.resetForm();

    // if we are editing, get the event to edit. If not, it will be null.
    if (this.route.snapshot.paramMap.get('id')) {
      this.getUserToEdit();
    }
  }


  getUserToEdit(){
      this.nuevoUsuario = false;
      // console.log(this.route.snapshot.data["user"].data);
      this.user = this.route.snapshot.data["user"].data;
      console.log(this.user);

      // this.user.date = this.user.date.replace(" ", "T");
    }

    editUser() {
      this.adminService.editUser(this.user).subscribe({
        next: (resp) => {
          console.log(resp);

          // this.createdOrEdited = true; // //changes boolean to true, so it doesn't ask for confirmation to leave page.
          this.userForm.form.markAsUntouched(); // mark all inputs as untouched when edited => cleaner
          this.toastr.success('Usuario editado correctamente');
        },
        error: error => console.error(error)
      });
    }

    setUser() {
      this.adminService.createUser(this.user).subscribe({
        next: (resp) => {
          console.log(resp);
          // this.createdOrEdited = true; //changes boolean to true, so it doesn't ask for confirmation to leave page.
          this.router.navigate(['/admin/usuarios'])
          this.toastr.success('Usuario creado correctamente');
        },
        error: error => console.error(error)
      });
    }

      // checks validity of lng and lat without being touched.
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
