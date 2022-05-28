import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SportService } from '../services/sport.service';
import { ToastrService } from 'ngx-toastr';
import { NgModel } from '@angular/forms';
import { Result } from 'ngx-mapbox-gl-geocoder-control';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/admin/services/admin.service';

@Component({
  selector: 'app-sport-form',
  templateUrl: './sport-form.component.html',
  styleUrls: ['./sport-form.component.css']
})
export class SportFormComponent implements OnInit {


  actividad = {
    "id": null,
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
    private adminService: AdminService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {


    console.log(this.route.snapshot);
    if (this.route.snapshot.params["nuevo"]) {
      this.titleService.setTitle("SportNow | Nueva Actividad");
      this.actividad.participar = false;
      console.log("en nuevo admin");

    }

    if (this.route.snapshot.data["event"]) {
      this.titleService.setTitle("SportNow | Editar Actividad");
      this.actividad = this.route.snapshot.data["event"].data;
      this.actividad.fecha = this.actividad.fecha.replace(" ", "T");
      console.log(this.actividad);
      console.log("en editar");

    }


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

  editActividad() {
    this.adminService.editActividad(this.actividad).subscribe({
      next: (resp) => {
        console.log(resp);
        // this.eventForm.form.markAsUntouched(); // mark all inputs as untouched when edited => cleaner
        this.toastr.success('Actividad editada correctamente');
      },
      error: error => {
        console.error(error);
        this.toastr.error('Error al editar la actividad');
      }
    });
  }

  deleteActividad() {
    this.adminService.deleteActividad(this.actividad.id!).subscribe({
      next: (resp) => {
        console.log(resp);
        this.router.navigate(['/admin/actividades'])
        this.toastr.success('Actividad eliminada correctamente');
      },
      error: error => {
        console.error(error);
        this.toastr.error('Error al eliminar la actividad');
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
