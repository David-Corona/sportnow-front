import { Component, OnInit, ViewChild} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit  {

  columnas = ['id', 'name', 'email', 'role', 'avatar', 'latitude', 'longitude', 'activated'];
  users: any[] = [];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;

  filtro: any = {
    nombre: null,
    rol: null,
    email: null,
    activo: null,
  };

  constructor(
    private titleService: Title,
    private adminService: AdminService,
    private router: Router,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.titleService.setTitle("Admin Usuarios | SportNow");
    this.getUsuarios();
  }

  getUsuarios(query?: string){
    this.adminService.getUsers(query).subscribe({
      next: (resp) => {
        this.users=resp.data;
        this.dataSource = new MatTableDataSource(resp.data);
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
        if (key == 'nombre') {
          query += `&name=${this.filtro[key]}`;
        }
        if (key == 'email') {
          query += `&email=${this.filtro[key]}`;
        }
        if (key == 'rol') {
          query += `&role=${this.filtro[key]}`;
        }
        if (key == 'activo') {
          query += `&activo=${this.filtro[key]}`;
        }
      }
    });
    this.getUsuarios(query);
  }

  reiniciar(){
    this.filtro = {
      nombre: null,
      rol: null,
      email: null,
      activo: null,
    };
    this.getUsuarios();
  }

  irDetalles(row: any) {
    this.router.navigate(['/admin/usuarios/'+row.id])
  }

}
