import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  columnas = ['evento.titulo', 'autor.name', 'created_at', 'mensaje']; //'evento.fecha', 'evento_id', 'user_id',
  mensajes: any[] = [];
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
    this.titleService.setTitle("Admin Mensajes | SportNow");
    this.getMensajes();
  }

  getMensajes(){
    this.adminService.getMensajes().subscribe({
      next: (resp) => {
        this.mensajes=resp.data;
        this.dataSource = new MatTableDataSource(this.mensajes);
        this.dataSource.sort = this.sort;
      },
      error: error => {
        console.error(error);
      }
    });
  }

  irDetalles(row: any) {
    this.router.navigate(['/admin/mensajes/'+row.id])
  }
}
