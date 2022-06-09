import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SportService } from 'src/app/sports/services/sport.service';


@Component({
  selector: 'app-participantes-form',
  templateUrl: './participantes-form.component.html',
  styleUrls: ['./participantes-form.component.css']
})
export class ParticipantesFormComponent implements OnInit {

  usuarios: any = [];
  actividades: any = [];
  actividad: any = {};
  usuario: any = {};

  constructor(
    private titleService: Title,
    private adminService: AdminService,
    private sportService: SportService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Alta Participante | SportNow");
    this.getUsuarios();
    this.getActividades();
  }

  altaParticipacion() {
    if (this.actividad.id && this.usuario.id) {
      this.sportService.apuntarActividad(this.actividad.id, this.usuario.id).subscribe({
        next: () => {
          this.router.navigate(['/admin/participantes'])
          this.toastr.success('Participación creada correctamente');
        },
        error: error => {
          console.error(error);
          this.toastr.error('Error al crear participación');
        }
      });
    } else {
      this.toastr.error('Introduzca actividad y usuario');
    }
  }

  getActividades(){
    this.adminService.getActividadesSelect().subscribe({
      next: (resp) => {
        this.actividades = resp.data;
      },
      error: e => {
        console.error(e);
        this.toastr.error('Error al obtener actividades');
      }
    });
  }

  getUsuarios(){
    this.adminService.getUsers().subscribe({
      next: (resp) => {
        this.usuarios=resp.data;
      },
      error: error => {
        console.error(error);
        this.toastr.error('Error al obtener los usuarios');
      }
    });
  }

}
