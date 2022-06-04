import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  columnas = ['created_at', 'autor.name', 'ip', 'mensaje'];
  logs: any[] = [];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;

  filtro: any = {
    ip: null,
    mensaje: null,
    autor: null,
    // fecha_inicio: null,
    // fecha_fin: null,
  };

  constructor(
    private titleService: Title,
    private adminService: AdminService,
    private router: Router,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.titleService.setTitle("Admin Logs | SportNow");
    this.getLogs();
  }

  getLogs(query?: string){
    this.adminService.getLogs(query).subscribe({
      next: (resp) => {
        this.logs=resp.data;
        this.dataSource = new MatTableDataSource(this.logs);
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
        if (key == 'ip') {
          query += `&${key}=${this.filtro[key]}`;
        }
        if (key == 'mensaje') {
          query += `&${key}=${this.filtro[key]}`;
        }
        if (key == 'autor') {
          query += `&${key}=${this.filtro[key]}`;
        }
        // if (key == 'fecha_inicio') {
        //   query += `&${key}=${this.filtro[key]}`;
        // }
        // if (key == 'fecha_fin') {
        //   query += `&${key}=${this.filtro[key]}`;
        // }
      }
    });
    this.getLogs(query);
  }

  reiniciar(){
    this.filtro = {
      ip: null,
      mensaje: null,
      autor: null,
      // fecha_inicio: null,
      // fecha_fin: null,
    };
    this.getLogs();
  }

}
