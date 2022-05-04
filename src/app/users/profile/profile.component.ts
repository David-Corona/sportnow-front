import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from '../interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  lat: number = 0;
  lng: number = 0;
  zoom = 16;
  user: User = {
    name: "",
    email: "",
    avatar: "",
    latitude: 0,
    longitude: 0
  }

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("SportNow | Perfil");

    // get the user from the router's data
    // this.user = this.route.snapshot.data["user"];
    console.log( this.route.snapshot);



    this.userService.getUser().subscribe({
      next: (resp) => {
        console.log(resp);
      },
      error: e => {
        console.error(e);
      }
    });





    // lat & lng to load user's location on map.
    this.lat = this.user.latitude;
    this.lng = this.user.longitude;
  }




}


