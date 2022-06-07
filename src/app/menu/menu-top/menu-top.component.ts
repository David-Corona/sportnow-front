import { Component, Input, OnInit} from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from 'src/app/users/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { almacenamiento } from 'src/constants'


@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.css']
})
export class MenuTopComponent implements OnInit {

  @Input() title!: string;
  logged: boolean = false;
  isAdmin: boolean = false;
  user: any = [];
  urlAlmacenamiento = almacenamiento.url;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    this.authService.loginChange$.subscribe({
      next: resp => {
        this.logged = resp;
        this.isAdmin = this.authService.getRole()=="admin" ? true : false;
        if (this.logged) {
          this.getUser();
        }
      },
      error: e => {
        console.error(e);
        this.toastr.error('Error al obtener autenticación');
      }
    });

  }

  getUser(){
    this.userService.getUser().subscribe({
      next: (resp) => {
        this.user = resp.data
      },
      error: e => {
        console.error(e);
        this.toastr.error('Error al cargar usuario');
      }
    });
  }

  logout(){
    this.isAdmin = false;
    this.authService.logout();
  }

}
