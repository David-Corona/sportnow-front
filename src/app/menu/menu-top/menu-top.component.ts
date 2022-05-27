import { Component, Input, OnInit} from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.css']
})
export class MenuTopComponent implements OnInit {

  @Input() title!: string;
  logged: boolean = false;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.loginChange$.subscribe({
      next: resp => {
        this.logged = resp;
        this.isAdmin = this.authService.getRole()=="admin" ? true : false;
      },
      error: error => console.error(error)
    });

    // TODO: Get Usuario para cargar su avatar
  }

  logout(){
    this.isAdmin = false;
    this.authService.logout();
  }

}
