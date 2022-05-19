import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserLogin } from '../interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserLogin = {
    email: "",
    password: ""
  }

  constructor(
    private titleService: Title,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("SportNow | Login");
    this.resetForm();
    this.geolocate();
  }

  tryLogin() {
    this.authService.login(this.user);
  }

  geolocate() {
    if (navigator.geolocation) { // si la geolocalización está activada
      navigator.geolocation.getCurrentPosition(position => {
        this.user.lat = position.coords.latitude;
        this.user.lng = position.coords.longitude;
      });
    }
  }

  resetForm() {
    this.user = {
      email: "",
      password: ""
    };
  }

}
