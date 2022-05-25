import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from '../interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { SportService } from 'src/app/sports/services/sport.service';
// import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // lat: number = 0;
  // lng: number = 0;
  zoom = 16;
  user: User = {
    name: "",
    email: "",
    avatar: "",
    latitude: 0,
    longitude: 0
  }
  isMe: boolean = false;
  eventos: any = [];
  eventosPasados: any = [];

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private sportService: SportService,
    // private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("SportNow | Perfil");

    // get the user from the router's data
    console.log( this.route.snapshot.data["user"]);
    this.user = this.route.snapshot.data["user"].data;
    this.isMe =  this.route.snapshot.data["user"].me;
    // console.log(this.user);

    // this.userService.getUser().subscribe({
    //   next: (resp) => {
    //     console.log(resp);
    //   },
    //   error: e => {
    //     console.error(e);
    //   }
    // });


    // lat & lng to load user's location on map.
    // this.lat = this.user.latitude;
    // this.lng = this.user.longitude;

    this.getMisActividades();
    this.getMiHistorial();
  }




  getMisActividades(){
    this.sportService.getActividades(this.user.id).subscribe({
      next: (resp) => {
        // this.eventos = resp.data;
        console.log(resp);
        this.eventos = resp.data;
        console.log(this.eventos);
      },
      error: e => {
        console.error(e);
      }
    });
  }

  getMiHistorial(){
    this.sportService.getHistorial(this.user.id).subscribe({
      next: (resp) => {
        // this.eventos = resp.data;
        console.log(resp);
        this.eventosPasados = resp.data;
        console.log(this.eventosPasados);
      },
      error: e => {
        console.error(e);
      }
    });

  }
}


