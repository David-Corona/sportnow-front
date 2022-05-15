import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SportService } from '../services/sport.service';

@Component({
  selector: 'app-sport-list',
  templateUrl: './sport-list.component.html',
  styleUrls: ['./sport-list.component.css']
})
export class SportListComponent implements OnInit {

  eventos: any = [];

  constructor(
    private titleService: Title,
    private sportService: SportService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("SportNow | Eventos Deportivos");

    this.getEventos();

  }

  getEventos(){
      this.sportService.getEventos().subscribe({
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
