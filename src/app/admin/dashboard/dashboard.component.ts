import { Component, OnInit, ViewChild } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SportService } from 'src/app/sports/services/sport.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  columnasDeportes = ['deporte.nombre', 'total'];
  columnasActividades = ['created_at', 'titulo', 'deporte.nombre'];
  columnasContactos = ['created_at', 'asunto', 'autor.name'];
  columnasUsuarios = ['usuario.name', 'total'];
  actividades: any[] = [];
  deportes: any[] = [];
  contactos: any[] = [];
  usuarios: any[] = [];
  dataSourceDeportes: MatTableDataSource<any>;
  dataSourceActividades: MatTableDataSource<any>;
  dataSourceContactos: MatTableDataSource<any>;
  dataSourceUsuarios: MatTableDataSource<any>;
  @ViewChild(MatSort) sortDeportes!: MatSort;
  @ViewChild(MatSort) sortActividades!: MatSort;
  @ViewChild(MatSort) sortContactos!: MatSort;
  @ViewChild(MatSort) sortUsuarios!: MatSort;

  constructor(
    private titleService: Title,
    private adminService: AdminService,
    private sportService: SportService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.dataSourceDeportes = new MatTableDataSource();
    this.dataSourceActividades = new MatTableDataSource();
    this.dataSourceContactos = new MatTableDataSource();
    this.dataSourceUsuarios = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.titleService.setTitle("SportNow | Admin Dashboard");

    this.getDeportesPopulares();
    this.getUltimasActividades();
    this.getUltimosContactos();
    this.getUsuariosActivos();
  }

  getDeportesPopulares(){
    this.adminService.getDeportesPopulares().subscribe({
      next: (resp) => {
        console.log(resp);
        this.deportes=resp.data;
        console.log(this.deportes);
        this.dataSourceDeportes = new MatTableDataSource(this.deportes);
        this.dataSourceDeportes.sort = this.sortDeportes;
      },
      error: error => {
        console.error(error);
        this.toastr.error('Error al cargar deportes');
      }
    });
  }

  getUltimasActividades(){
    this.adminService.getUltimasActividades().subscribe({
      next: (resp) => {
        console.log(resp);
        this.actividades=resp.data;
        console.log(this.actividades);
        this.dataSourceActividades = new MatTableDataSource(this.actividades);
        this.dataSourceActividades.sort = this.sortActividades;
      },
      error: error => {
        console.error(error);
        this.toastr.error('Error al cargar actividades');
      }
    });
  }

  getUltimosContactos(){
    this.adminService.getUltimosContactos().subscribe({
      next: (resp) => {
        console.log(resp);
        this.contactos=resp.data;
        console.log(this.contactos);
        this.dataSourceContactos = new MatTableDataSource(this.contactos);
        this.dataSourceContactos.sort = this.sortContactos;
      },
      error: error => {
        console.error(error);
        this.toastr.error('Error al cargar contactos');
      }
    });
  }

  getUsuariosActivos(){
    this.adminService.getUsuariosActivos().subscribe({
      next: (resp) => {
        console.log(resp);
        this.usuarios=resp.data;
        console.log(this.usuarios);
        this.dataSourceUsuarios = new MatTableDataSource(this.usuarios);
        this.dataSourceUsuarios.sort = this.sortUsuarios;
      },
      error: error => {
        console.error(error);
        this.toastr.error('Error al cargar usuarios');
      }
    });
  }

  // irDetallesdeportes(row: any) {
  //   this.router.navigate(['/admin/deportes/'+row.id])
  // }

  // irDetallesActividades(row: any) {
  //   this.router.navigate(['/admin/actividades/'+row.id])
  // }

}
