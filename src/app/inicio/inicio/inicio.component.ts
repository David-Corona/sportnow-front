import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SportService } from 'src/app/sports/services/sport.service';



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
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("SportNow | Inicio");

    this.getProximasActividades();
  }


  getProximasActividades(){
    this.sportService.getProximasActividades(5).subscribe({
    next: (resp) => {
      this.eventos = resp.data;
      console.log(this.eventos);
    },
    error: e => {
      console.error(e);
    }
  });
}

}
