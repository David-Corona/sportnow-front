import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SportService } from 'src/app/sports/services/sport.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  eventos: any = [];

  constructor(
    private titleService: Title,
    private sportService: SportService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Inicio | SportNow");
    this.getProximasActividades();
  }

  getProximasActividades(){
    this.sportService.getProximasActividades(5).subscribe({
      next: (resp) => {
        this.eventos = resp.data;
      },
      error: e => {
        console.error(e);
        this.toastr.error('Error al cargar actividades');
      }
    });
  }
}
