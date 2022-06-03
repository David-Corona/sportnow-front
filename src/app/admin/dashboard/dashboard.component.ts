import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';


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

  constructor(
    private titleService: Title,
    private adminService: AdminService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.dataSourceDeportes = new MatTableDataSource();
    this.dataSourceActividades = new MatTableDataSource();
    this.dataSourceContactos = new MatTableDataSource();
    this.dataSourceUsuarios = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.titleService.setTitle("Admin Dashboard | SportNow");

    this.getDeportesPopulares();
    this.getUltimasActividades();
    this.getUltimosContactos();
    this.getUsuariosActivos();
  }

  getDeportesPopulares(){
    this.adminService.getDeportesPopulares().subscribe({
      next: (resp) => {
        this.deportes=resp.data;
        this.dataSourceDeportes = new MatTableDataSource(this.deportes);
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
        this.actividades=resp.data;
        this.dataSourceActividades = new MatTableDataSource(this.actividades);
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
        this.contactos=resp.data;
        this.dataSourceContactos = new MatTableDataSource(this.contactos);
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
        this.usuarios=resp.data;
        this.dataSourceUsuarios = new MatTableDataSource(this.usuarios);
      },
      error: error => {
        console.error(error);
        this.toastr.error('Error al cargar usuarios');
      }
    });
  }

  // TODO

  // irDetallesDeporte(row: any) {
  //   this.router.navigate(['/admin/deportes/'+row.id])
  // }

  // irDetallesActividad(row: any) {
  //   this.router.navigate(['/admin/actividades/'+row.id])
  // }

  //irDetallesContacto

  //irDetallesUsuario
}
