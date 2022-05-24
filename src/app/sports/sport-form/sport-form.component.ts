import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SportService } from '../services/sport.service';
import { ToastrService } from 'ngx-toastr';
import { NgModel } from '@angular/forms';
import { Result } from 'ngx-mapbox-gl-geocoder-control';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sport-form',
  templateUrl: './sport-form.component.html',
  styleUrls: ['./sport-form.component.css']
})
export class SportFormComponent implements OnInit {


  actividad = {
    "titulo": "",
    "descripcion": "",
    "deporte_id": null,
    "fecha": "",
    "direccion": "",
    "latitud": 38.34796132403571,
    "longitud": -0.4855421677761779,
    "participar": true
  }
  // "id": null,
  zoom = 16;

  constructor(
    private titleService: Title,
    private sportService: SportService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("SportNow | Nueva Actividad");

    // this.resetForm();
  }

  crearActividad() {

    this.sportService.createActividad(this.actividad).subscribe({
      next: resp => {
        console.log(resp);
        this.toastr.success('Actividad creada correctamente');
        this.router.navigate(['/actividades']);
      },
      error: error => {
        console.error(error);
        this.toastr.error('Error al crear la actividad');
      }
    });

  }

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid,
    };
  }

    // when another address is selected => set lat, lng and address.
    cambiarPosicion(result: Result) {
      this.actividad.latitud = result.geometry.coordinates[1];
      this.actividad.longitud = result.geometry.coordinates[0];
      this.actividad.direccion = result.place_name;

      console.log(this.actividad);
    }

    // mapClicked($event: any){
    //   console.log('Global listener on the map "clicked"', $event);
    // }

  // resetForm() {
  //   this.actividad = {
  //     "titulo": "",
  //     "descripcion": "",
  //     "deporte_id": 0,
  //     "fecha": "",
  //     "direccion": "",
  //     "latitud": 0,
  //     "longitud": 0
  //   };
  // }


}
