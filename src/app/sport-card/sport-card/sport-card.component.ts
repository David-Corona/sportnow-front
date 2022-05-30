import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sport-card',
  templateUrl: './sport-card.component.html',
  styleUrls: ['./sport-card.component.css']
})
export class SportCardComponent implements OnInit {

  @Input() evento!: any;

  constructor() { }

  ngOnInit(): void {
  }

}
