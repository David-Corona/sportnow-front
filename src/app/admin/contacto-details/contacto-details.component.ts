import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contacto-details',
  templateUrl: './contacto-details.component.html',
  styleUrls: ['./contacto-details.component.css']
})
export class ContactoDetailsComponent implements OnInit {

  contacto: any = [];

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("SportNow | Admin Contacto");

    this.contacto = this.route.snapshot.data["contacto"].data;
    console.log(this.contacto);
  }

}
