import { Component, OnInit, ViewChild } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

// import {MatPaginator} from '@angular/material/paginator';
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

  constructor(
    private titleService: Title,
    private adminService: AdminService,
    private router: Router,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.titleService.setTitle("SportNow | Admin Contacto");
    this.getContactos();
  }

  getContactos(){
    this.adminService.getContactos().subscribe({
      next: (resp) => {
        console.log(resp);
        this.contactos=resp.data;
        console.log(this.contactos);
        this.dataSource = new MatTableDataSource(this.contactos);
        this.dataSource.sort = this.sort;
      },
      error: error => {
        console.error(error);
      }
    });
  }

  irDetalles(row: any) {
    this.router.navigate(['/admin/contacto/'+row.id])
  }

}
