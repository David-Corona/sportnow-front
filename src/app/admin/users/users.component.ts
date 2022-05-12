import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { AdminService } from '../services/admin.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    private titleService: Title,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("SportNow | Admin Usuarios");



    this.adminService.getUsers().subscribe({
      next: (resp) => {
        console.log(resp);

        // Swal.fire("Perfil actualizado",
        // "Su perfil se ha actualizado correctamente",
        // "success");

      },
      error: error => {
        console.error(error);
        // Swal.fire("¡Error!",
        // "El perfil no ha podido ser editado, comprueba que el email no está en uso.",
        // "error");
      }
    });

  }

}
