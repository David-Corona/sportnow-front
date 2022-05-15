import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SportService } from '../services/sport.service';

@Component({
  selector: 'app-sport-details',
  templateUrl: './sport-details.component.html',
  styleUrls: ['./sport-details.component.css']
})
export class SportDetailsComponent implements OnInit {

  evento: number = 0;
  comentarios: any = [];



  constructor(
    private titleService: Title,
    // private sportService: SportService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("SportNow | Detalles Evento Deportivo");

    console.log( this.route.snapshot);
    this.evento = this.route.snapshot.data["event"].data;
    console.log(this.evento);

    // this.getEvento();
  }


  // getEvento(){
  //     this.sportService.getEvento().subscribe({
  //     next: (resp) => {
  //       this.evento = resp.data;
  //       console.log(this.evento);
  //     },
  //     error: e => {
  //       console.error(e);
  //     }
  //   });
  // }

}
