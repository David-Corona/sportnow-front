import { Component, Input, OnInit} from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from 'src/app/users/services/user.service';

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

  constructor(
    private authService: AuthService,
    private userService: UserService,
    ) { }

  ngOnInit(): void {
    this.authService.loginChange$.subscribe({
      next: resp => {
        this.logged = resp;
        this.isAdmin = this.authService.getRole()=="admin" ? true : false;
      },
      error: error => console.error(error)
    });

    this.getUser();
  }

  getUser(){
    this.userService.getUser().subscribe({
      next: (resp) => {
        this.user = resp.data
      },
      error: e => {
        console.error(e);
      }
    });
  }

  logout(){
    this.isAdmin = false;
    this.authService.logout();
  }

}
