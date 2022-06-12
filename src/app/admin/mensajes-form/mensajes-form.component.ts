import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SportService } from 'src/app/sports/services/sport.service';
import { almacenamiento } from 'src/constants'

@Component({
  selector: 'app-mensajes-form',
  templateUrl: './mensajes-form.component.html',
  styleUrls: ['./mensajes-form.component.css']
})
export class MensajesFormComponent implements OnInit {

  actividades: any = [];
  actividad: any = [];
  nuevoComentario: string = "";
  urlAlmacenamiento = almacenamiento.url;

  constructor(
    private titleService: Title,
    private adminService: AdminService,
    private sportService: SportService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Nuevo mensaje | SportNow");
    this.getActividades();
  }


  nuevoMensaje() {
    if (this.actividad.id && this.nuevoComentario) {
      this.sportService.postComentario(this.actividad.id, this.nuevoComentario).subscribe({
        next: (resp) => {
          this.actividad.comentarios.push(resp.data);
          this.nuevoComentario = "";
          this.toastr.success('Comentario realizado correctamente');
        },
        error: error => {
          console.error(error);
          this.toastr.error('Error al publicar mensaje');
        }
      });
    } else {
      this.toastr.error('Introduzca actividad y mensaje');
    }
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


  getActividades(){
    this.adminService.getActividades().subscribe({
      next: (resp) => {
        this.actividades = resp.data;
      },
      error: e => {
        console.error(e);
        this.toastr.error('Error al obtener actividades');
      }
    });
  }

}
