import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  columnas = ['id', 'fecha','deporte.nombre', 'titulo', 'direccion', 'latitud', 'longitud']; //'descripcion',
  actividades: any[] = [];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;

  filtro: any = {
    titulo: null,
    deporte: null,
    fecha_inicio: null,
    fecha_fin: null,
  };

  constructor(
    private titleService: Title,
    private adminService: AdminService,
    private router: Router,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.titleService.setTitle("SportNow | Admin Actividades");
    this.getActividades();
  }

  getActividades(query?: string){
    this.adminService.getActividades(query).subscribe({
      next: (resp) => {
        this.actividades=resp.data;
        this.dataSource = new MatTableDataSource(this.actividades);
        this.dataSource.sort = this.sort;
      },
      error: error => {
        console.error(error);
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

  irDetalles(row: any) {
    this.router.navigate(['/admin/actividades/editar/'+row.id])
  }

}
