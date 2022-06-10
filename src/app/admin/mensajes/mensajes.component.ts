import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  columnas = ['evento.titulo', 'autor.name', 'created_at', 'mensaje', 'eliminar']; //'evento.fecha', 'evento_id', 'user_id',
  mensajes: any[] = [];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;
  filtro: any = {
    usuario: null,
    fecha_inicio: null,
    fecha_fin: null,
  };

  constructor(
    private titleService: Title,
    private adminService: AdminService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.titleService.setTitle("Admin Mensajes | SportNow");
    this.getMensajes();
  }

  getMensajes(query?: string){
    this.adminService.getMensajes(query).subscribe({
      next: (resp) => {
        this.mensajes=resp.data;
        this.dataSource = new MatTableDataSource(this.mensajes);
        this.dataSource.sort = this.sort;
      },
      error: error => {
        console.error(error);
        this.toastr.error('Error al cargar mensajes');
      }
    });
  }

  deleteMensaje(row: any){
    this.adminService.deleteMensaje(row.id).subscribe({
      next: () => {
        this.mensajes = this.mensajes.filter(function(item) {
          return item.id != row.id;
        });
        this.dataSource = new MatTableDataSource(this.mensajes);
        this.dataSource.sort = this.sort;
        this.toastr.success('Comentario eliminadp correctamente');
      },
      error: error => {
        console.error(error);
        this.toastr.error('Error al eliminar comentario');
      }
    });
  }

  filtrar(){
    let query = '';
    Object.keys(this.filtro).forEach((key) => {
      if (this.filtro[key]) {
        if (key == 'usuario') {
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
    this.getMensajes(query);
  }

  reiniciar(){
    this.filtro = {
      usuario: null,
      fecha_inicio: null,
      fecha_fin: null,
    };
    this.getMensajes();
  }

  irDetalles(row: any) {
    this.router.navigate(['/admin/mensajes/'+row.id])
  }
}
