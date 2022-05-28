import { Component, OnInit, ViewChild } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-participantes',
  templateUrl: './participantes.component.html',
  styleUrls: ['./participantes.component.css']
})
export class ParticipantesComponent implements OnInit {

  columnas = ['evento_id','evento.titulo', 'evento.fecha', 'user_id', 'usuario.name', 'created_at'];
  participantes: any[] = [];
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
    this.titleService.setTitle("SportNow | Admin Participantes");
    this.getParticipantes();
  }

  getParticipantes(){
    this.adminService.getParticipantes().subscribe({
      next: (resp) => {
        console.log(resp);
        this.participantes=resp.data;
        console.log(this.participantes);
        this.dataSource = new MatTableDataSource(this.participantes);
        this.dataSource.sort = this.sort;
      },
      error: error => {
        console.error(error);
      }
    });
  }

  irDetalles(row: any) {
    this.router.navigate(['/admin/participantes/'+row.id])
  }


}
