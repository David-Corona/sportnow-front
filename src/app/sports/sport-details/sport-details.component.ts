import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SportService } from '../services/sport.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sport-details',
  templateUrl: './sport-details.component.html',
  styleUrls: ['./sport-details.component.css']
})
export class SportDetailsComponent implements OnInit {

  evento: any = [];
  // comentarios: any = [];
  // participantes: any = [];
  nuevoComentario: string = "";



  constructor(
    private titleService: Title,
    private sportService: SportService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("SportNow | Detalles Evento Deportivo");
    console.log( this.route.snapshot);
    this.evento = this.route.snapshot.data["event"].data;
    // this.participantes = this.route.snapshot.data["event"].data.participantes;
    // this.comentarios = this.route.snapshot.data["event"].data.comentarios;
    console.log(this.evento);


    // this.getEvento(this.participantes);
  }


  postComment(){
    this.sportService.postComentario(this.evento.id, this.nuevoComentario).subscribe({
      next: (resp) => {
        // this.comments.push(com);
        console.log(resp);
        this.evento.comentarios.push(resp.data);
        this.nuevoComentario = "";
        this.toastr.success('Comentario realizado correctamente');
      },
      error: error => console.error(error)
    });
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
