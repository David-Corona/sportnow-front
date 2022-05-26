import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';

import { Title } from '@angular/platform-browser';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

// import {MatPaginator} from '@angular/material/paginator';
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

  getActividades(){
    this.adminService.getActividades().subscribe({
      next: (resp) => {
        console.log(resp);
        this.actividades=resp.data;
        console.log(this.actividades);
        this.dataSource = new MatTableDataSource(this.actividades);
        this.dataSource.sort = this.sort;
      },
      error: error => {
        console.error(error);
      }
    });
  }

  irDetalles(row: any) {
    this.router.navigate(['/admin/actividades/editar/'+row.id])
  }

}
