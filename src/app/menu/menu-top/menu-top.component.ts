import { Component, Input, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.css']
})
export class MenuTopComponent implements OnInit {

  @Input() title!: string;
  logged: boolean = false;
  isAdmin: boolean = true; //TODO

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.loginChange$.subscribe({
      next: resp => this.logged = resp,
      error: error => console.error(error)
    })
  }

  logout(){
    this.authService.logout();
  }

}
