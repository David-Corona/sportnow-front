import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-participantes',
  templateUrl: './participantes.component.html',
  styleUrls: ['./participantes.component.css']
})
export class ParticipantesComponent implements OnInit {

  columnas = ['evento_id','evento.titulo', 'evento.fecha', 'user_id', 'usuario.name', 'created_at', 'eliminar'];
  participantes: any[] = [];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private titleService: Title,
    private adminService: AdminService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.titleService.setTitle("Admin Participantes | SportNow");
    this.getParticipantes();
  }

  getParticipantes(){
    this.adminService.getParticipantes().subscribe({
      next: (resp) => {
        this.participantes=resp.data;
        this.dataSource = new MatTableDataSource(this.participantes);
        this.dataSource.sort = this.sort;
      },
      error: error => {
        console.error(error);
        this.toastr.error('Error al listar los participantes');
      }
    });
  }

  deleteParticipacion(row: any){
    this.adminService.deleteParticipante(row.id).subscribe({
      next: () => {
        this.participantes = this.participantes.filter(function(item) {
          return item.id != row.id;
        });
        this.dataSource = new MatTableDataSource(this.participantes);
        this.dataSource.sort = this.sort;
        this.toastr.success('Participación eliminada correctamente');
      },
      error: error => {
        console.error(error);
        this.toastr.error('Error al eliminar participación');
      }
    });
  }


}
