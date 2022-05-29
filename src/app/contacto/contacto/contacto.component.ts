import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgModel, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContactoService } from '../services/contacto.service';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  @ViewChild('contactForm') contactForm!: NgForm;

  ubicacion = {
    latitud: 38.53710269642236,
    longitud: -0.12907398603944442
  };
  zoom = 14;

  contacto = {
    asunto: "",
    mensaje: "",
    motivo: "",
    telefono: "",
  }

  constructor(
    private titleService: Title,
    private toastr: ToastrService,
    private contactoService: ContactoService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("SportNow | Contacto");
  }

  contactar(){
    this.contactoService.postContacto(this.contacto).subscribe({
      next: (resp) => {
        console.log(resp);
        this.resetForm();
        this.toastr.success('Mensaje enviado correctamente');
      },
      error: error => console.error(error)
    });
  }

  resetForm(){
    this.contacto = {
      asunto: "",
      mensaje: "",
      motivo: "",
      telefono: "",
    }
    this.contactForm.form.markAsUntouched();
  }

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid,
    };
  }
}
