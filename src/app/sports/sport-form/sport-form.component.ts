import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SportService } from '../services/sport.service';
import { ToastrService } from 'ngx-toastr';
import { NgModel, NgForm } from '@angular/forms';
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
  zoom = 16;
  @ViewChild('contactForm') eventForm!: NgForm;

  constructor(
    private titleService: Title,
    private sportService: SportService,
    private adminService: AdminService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    if (this.route.snapshot.params["nuevo"]) {
      this.titleService.setTitle("Nueva Actividad | SportNow");
      this.actividad.participar = false;
    }

    if (this.route.snapshot.data["event"]) {
      this.titleService.setTitle("Editar Actividad | SportNow");
      this.actividad = this.route.snapshot.data["event"].data;
      this.actividad.fecha = this.actividad.fecha.replace(" ", "T");
    }

  }

  crearActividad() {
    this.sportService.createActividad(this.actividad).subscribe({
      next: () => {
        this.toastr.success('Actividad creada correctamente');
        this.router.navigate(['/actividades']);
      },
      error: e => {
        console.error(e);
        this.toastr.error('Error al crear la actividad');
      }
    });
  }

  editActividad() {
    this.adminService.editActividad(this.actividad).subscribe({
      next: () => {
        this.eventForm.form.markAsUntouched();
        this.toastr.success('Actividad editada correctamente');
      },
      error: e => {
        console.error(e);
        this.toastr.error('Error al editar la actividad');
      }
    });
  }

  deleteActividad() {
    this.adminService.deleteActividad(this.actividad.id!).subscribe({
      next: () => {
        this.router.navigate(['/admin/actividades'])
        this.toastr.success('Actividad eliminada correctamente');
      },
      error: e => {
        console.error(e);
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

  cambiarPosicion(result: Result) {
    this.actividad.latitud = result.geometry.coordinates[1];
    this.actividad.longitud = result.geometry.coordinates[0];
    this.actividad.direccion = result.place_name;
  }

  // resetForm() {
  //   this.actividad = {
  //     "id": null,
  //     "titulo": "",
  //     "descripcion": "",
  //     "deporte_id": null,
  //     "fecha": "",
  //     "direccion": "",
  //     "latitud": 38.34796132403571,
  //     "longitud": -0.4855421677761779,
  //     "participar": true
  //   };
  // }

}
