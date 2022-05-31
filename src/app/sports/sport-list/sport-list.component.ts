import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SportService } from '../services/sport.service';

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
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("SportNow | Actividades");

    this.getActividades();
  }

  getActividades(query?: string){
      this.sportService.getActividades(undefined, query).subscribe({
      next: (resp) => {
        this.eventos = resp.data;
        console.log(this.eventos);
      },
      error: e => {
        console.error(e);
      }
    });
  }

    // const filtroOptions = `&jobs_category_type_id=1`;
  // const resp = await getAllCategories({withRelations:false, page: null, filtro: filtroOptions});
  filtrar(){
    console.log("en filtrar");
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
        // if (key == 'dates' && this.filter[key].length > 0) {
        //   query += `&start_created_at=${this.filter[key][0]} 00:00:00`;
        //   query += `&end_created_at=${this.filter[key][1]} 23:59:59`;
        // }
      }
    });
    console.log(query);
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
