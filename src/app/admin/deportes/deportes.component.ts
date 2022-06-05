import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-deportes',
  templateUrl: './deportes.component.html',
  styleUrls: ['./deportes.component.css']
})
export class DeportesComponent implements OnInit {

  columnas = ['id','nombre', 'max_participantes', 'imagen'];
  deportes: any[] = [];
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
    this.titleService.setTitle("Admin Contacto | SportNow");
    this.getDeportes();
  }

  getDeportes(){
    this.adminService.getDeportes().subscribe({
      next: (resp) => {
        this.deportes=resp.data;
        this.dataSource = new MatTableDataSource(this.deportes);
        this.dataSource.sort = this.sort;
      },
      error: error => {
        console.error(error);
      }
    });
  }

  irDetalles(row: any) {
    this.router.navigate(['/admin/deportes/'+row.id])
  }

}
