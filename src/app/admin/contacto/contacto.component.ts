import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  columnas = ['created_at','autor.name', 'asunto', 'motivo', 'autor.email', 'telefono']; //'mensaje'
  contactos: any[] = [];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;

  filtro: any = {
    autor: null,
    motivo: null,
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
    this.titleService.setTitle("Admin Contacto | SportNow");
    this.getContactos();
  }

  getContactos(query?: string){
    this.adminService.getContactos(query).subscribe({
      next: (resp) => {
        this.contactos=resp.data;
        this.dataSource = new MatTableDataSource(this.contactos);
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
        if (key == 'autor') {
          query += `&${key}=${this.filtro[key]}`;
        }
        if (key == 'motivo') {
          query += `&${key}=${this.filtro[key]}`;
        }
        if (key == 'fecha_inicio') {
          query += `&${key}=${this.filtro[key]}`;
        }
        if (key == 'fecha_fin') {
          query += `&${key}=${this.filtro[key]}`;
        }
      }
    });
    this.getContactos(query);
  }

  reiniciar(){
    this.filtro = {
      autor: null,
      motivo: null,
      fecha_inicio: null,
      fecha_fin: null,
    };
    this.getContactos();
  }

  irDetalles(row: any) {
    this.router.navigate(['/admin/contacto/'+row.id])
  }

}
