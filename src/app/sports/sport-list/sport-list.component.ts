import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SportService } from '../services/sport.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sport-list',
  templateUrl: './sport-list.component.html',
  styleUrls: ['./sport-list.component.css']
})
export class SportListComponent implements OnInit {

  eventos: any = [];

  filtro: any = {
    titulo: null,
    deporte: null,
    fecha_inicio: null,
    fecha_fin: null,
  };

  constructor(
    private titleService: Title,
    private sportService: SportService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Actividades | SportNow");
    this.getActividades();
  }

  getActividades(query?: string){
      this.sportService.getActividades(undefined, query).subscribe({
      next: (resp) => {
        this.eventos = resp.data;
      },
      error: e => {
        console.error(e);
        this.toastr.error('Error al obtener actividades');
      }
    });
  }

  filtrar(){
    let query = '';
    Object.keys(this.filtro).forEach((key) => {
      if (this.filtro[key]) {
        if (key == 'titulo') {
          query += `&${key}=${this.filtro[key]}`;
        }
        if (key == 'deporte') {
          query += `&deporte_id=${this.filtro[key]}`;
        }
        if (key == 'fecha_inicio') {
          query += `&${key}=${this.filtro[key]}`;
        }
        if (key == 'fecha_fin') {
          query += `&${key}=${this.filtro[key]}`;
        }
      }
    });
    this.getActividades(query);
  }

  reiniciar(){
    this.filtro = {
      titulo: null,
      deporte: null,
      fecha_inicio: null,
      fecha_fin: null,
    };
    this.getActividades();
  }

}
