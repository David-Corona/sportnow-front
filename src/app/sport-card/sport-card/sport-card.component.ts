import { Component, OnInit, Input } from '@angular/core';
import { almacenamiento } from 'src/constants'

@Component({
  selector: 'app-sport-card',
  templateUrl: './sport-card.component.html',
  styleUrls: ['./sport-card.component.css']
})
export class SportCardComponent implements OnInit {

  urlAlmacenamiento = almacenamiento.url;
  @Input() evento!: any;

  constructor() { }

  ngOnInit(): void {
  }

}
