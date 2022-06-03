import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SportService } from '../services/sport.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sport-details',
  templateUrl: './sport-details.component.html',
  styleUrls: ['./sport-details.component.css']
})
export class SportDetailsComponent implements OnInit {

  actividad: any = [];
  nuevoComentario: string = "";
  zoom = 14;

  constructor(
    private titleService: Title,
    private sportService: SportService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Detalles Actividad | SportNow");
    console.log( this.route.snapshot);
    this.actividad = this.route.snapshot.data["event"].data;
    // this.participantes = this.route.snapshot.data["event"].data.participantes;
    // this.comentarios = this.route.snapshot.data["event"].data.comentarios;
    console.log(this.actividad);


    // this.getActividad(this.participantes);
  }


  postComment(){
    this.sportService.postComentario(this.actividad.id, this.nuevoComentario).subscribe({
      next: (resp) => {
        // this.comments.push(com);
        console.log(resp);
        this.actividad.comentarios.push(resp.data);
        this.nuevoComentario = "";
        this.toastr.success('Comentario realizado correctamente');
      },
      error: error => console.error(error)
    });
  }

  participacion() {
    if (this.actividad.participo) {
      this.sportService.desapuntarActividad(this.actividad.id).subscribe({
        next: (resp: any) => {
          this.actividad.participantes = resp.data;
          this.actividad.participo = false;
          this.toastr.success('Desapuntado correctamente!');
          if (resp.evento_eliminado){
            this.router.navigate(['/actividades']);
          }
        },
        error: error => {
          console.error(error);
          this.toastr.error('Error al desapuntarse');
        }
      });
    } else {
      this.sportService.apuntarActividad(this.actividad.id).subscribe({
        next: (resp: any) => {
          console.log(resp);
          this.actividad.participantes.push(resp.data);
          this.actividad.participo = true;
          this.toastr.success('Apuntado correctamente!');
        },
        error: error => {
          console.error(error);
          this.toastr.error('No se ha podido apuntar');
        }
      });
    }
  }




  // getActividad(){
  //     this.sportService.getActividad().subscribe({
  //     next: (resp) => {
  //       this.evento = resp.data;
  //       console.log(this.evento);
  //     },
  //     error: e => {
  //       console.error(e);
  //     }
  //   });
  // }

}
