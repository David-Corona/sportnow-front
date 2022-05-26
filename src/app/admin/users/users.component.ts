import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';

import { Title } from '@angular/platform-browser';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit  {

  columnas = ['id', 'name', 'email', 'role', 'avatar', 'latitude', 'longitude', 'activated'];
  users: any[] = [];

  // dataSource = new MatTableDataSource(this.users);
  // dataSource:any;
  dataSource: MatTableDataSource<any>;
  // dataSource!: MatTableDataSource<any>;

  // @ViewChild(MatSort) sort!: MatSort;
  // @ViewChild(MatSort, { static: false }) sort!: MatSort;
  // @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort);
  @ViewChild(MatSort) sort!: MatSort;

  filtro: any = {
    nombre: null,
  };

  constructor(
    private titleService: Title,
    private adminService: AdminService,
    private router: Router,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.titleService.setTitle("SportNow | Admin Usuarios");

    this.getUsuarios();
    // this.dataSource = new MatTableDataSource(this.users);
    // this.dataSource.sort = this.sort;

  }

  // const filtroOptions = `&jobs_category_type_id=1`;
  // const resp = await getAllCategories({withRelations:false, page: null, filtro: filtroOptions});
  filtrar(){
    console.log("en filtrar");
    let query = '';

    Object.keys(this.filtro).forEach((key) => {
      if (this.filtro[key]) {

        if (key == 'nombre') {
          query += `&name=${this.filtro[key]}`;
        }
        // else if (key == 'workday') {
        //   query += `&${key}=${this.filter[key].name}`;
        // }
        // else {
        //   query += `&${key}=${this.filter[key]}`;
        // }
      }
    });
    console.log(query);
    this.getUsuarios(query);

  }

  reiniciar(){
    this.filtro = {
      nombre: null,
    };
    this.getUsuarios();
  }

  getUsuarios(query?: string){
    this.adminService.getUsers(query).subscribe({
      next: (resp) => {
        console.log(resp);
        this.users=resp.data;
        console.log(this.users);
        this.dataSource = new MatTableDataSource(resp.data);
        console.log(this.dataSource);
        // this.dataSource = new MatTableDataSource<Usuario>(this.users);
        this.dataSource.sort = this.sort;
        console.log(this.dataSource.sort);
        // this.dataSource.data = this.users;
      },
      error: error => {
        console.error(error);
      }
    });
  }

  irDetalles(row: any) {
    this.router.navigate(['/admin/usuarios/'+row.id])
  }

}

// export class Articulo {
//   constructor(public codigo: number, public descripcion: string, public precio: number) {
//   }
// }

// export class Usuario {
//   constructor(public id: number, public name: string, public email: string, public role: string, public avatar: string,
//     public latitude: number, public longitude: number, public activated: number) {
//   }
// }

// export interface Usuario {
//   id : number,
//   name: string,
//   email: string,
//   role: string,
//   avatar: string,
//   latitude: number,
//   longitude: number,
//   activated: number
// }
