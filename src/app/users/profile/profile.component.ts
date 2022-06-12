import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from '../interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { SportService } from 'src/app/sports/services/sport.service';
import { ToastrService } from 'ngx-toastr';
import { almacenamiento } from 'src/constants'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

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
  urlAlmacenamiento = almacenamiento.url;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private sportService: SportService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Perfil | SportNow");

    // Carga router data el usuario y booleano si es el perfil del usuario logueado
    this.user = this.route.snapshot.data["user"].data;
    this.isMe =  this.route.snapshot.data["user"].me;

    this.getMisActividades();
    this.getMiHistorial();
  }

  getMisActividades(){
    this.sportService.getActividades(this.user.id).subscribe({
      next: (resp) => {
        this.eventos = resp.data;
      },
      error: e => {
        console.error(e);
        this.toastr.error('Error al cargar las actividades');
      }
    });
  }

  getMiHistorial(){
    this.sportService.getHistorial(this.user.id).subscribe({
      next: (resp) => {
        this.eventosPasados = resp.data;
      },
      error: e => {
        console.error(e);
        this.toastr.error('Error al cargar el historial');
      }
    });
  }
}


