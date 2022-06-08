import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SportService } from '../services/sport.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { almacenamiento } from 'src/constants'

@Component({
  selector: 'app-sport-details',
  templateUrl: './sport-details.component.html',
  styleUrls: ['./sport-details.component.css']
})
export class SportDetailsComponent implements OnInit {

  actividad: any = [];
  nuevoComentario: string = "";
  zoom = 14;
  urlAlmacenamiento = almacenamiento.url;

  constructor(
    private titleService: Title,
    private sportService: SportService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Detalles Actividad | SportNow");
    this.actividad = this.route.snapshot.data["event"].data;
  }

  postComment(){
    this.sportService.postComentario(this.actividad.id, this.nuevoComentario).subscribe({
      next: (resp) => {
        this.actividad.comentarios.push(resp.data);
        this.nuevoComentario = "";
        this.toastr.success('Comentario realizado correctamente');
      },
      error: e => {
        console.error(e);
        this.toastr.error('Error al comentar');
      }
    });
  }

  participacion() {
    if (this.actividad.participo) {
      this.sportService.desapuntarActividad(this.actividad.id).subscribe({
        next: (resp: any) => {
          console.log(resp.data);
          this.actividad.participantes = resp.data;
          this.actividad.participo = false;
          this.toastr.success('Desapuntado correctamente!');
          if (resp.evento_eliminado){
            this.router.navigate(['/actividades']);
          }
        },
        error: e => {
          console.error(e);
          this.toastr.error('Error al desapuntarse');
        }
      });
    } else {
      this.sportService.apuntarActividad(this.actividad.id).subscribe({
        next: (resp: any) => {
          console.log(resp.data);

          this.actividad.participantes = resp.data;
          // this.actividad.participantes.push(resp.data);
          this.actividad.participo = true;
          this.toastr.success('Apuntado correctamente!');
        },
        error: e => {
          console.error(e);
          this.toastr.error('No se ha podido apuntar');
        }
      });
    }
  }

}
