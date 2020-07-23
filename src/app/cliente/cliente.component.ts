import { Component, OnInit } from '@angular/core';
import { ClienteDatos } from './cliente-datos';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html'
})
export class ClienteComponent implements OnInit{

  public clientes: ClienteDatos[];


  //injectamos el service
  constructor(private clienteService: ClienteService, private router: Router) {
  }

  //se ejecuta cuando se inicia el commponente
  ngOnInit() {
    LoaderComponent.STATUS = true;
    /*if(this.clienteService.logInValid() == false) {
      swal.fire("¡Inicia sesión por favor!", "", "info");
      this.router.navigate(["/login"]);
    }*/
     this.clienteService.getClientes().subscribe(
       response => {
         this.clientes = response
         LoaderComponent.STATUS = false;
       }
     );
  }

  public delete(cliente: ClienteDatos): void {
    swal.fire({
      title: '¡Eliminar!',
      text: "¿Estas seguro de eliminar ha " + cliente.usuarioDato.nombre + " " + cliente.usuarioDato.apellido + "?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        LoaderComponent.STATUS = true;
        this.clienteService.delete(cliente.usuarioHasRolList[0].id).subscribe(
          response => {
            swal.fire(
              'Eliminado!',
              response.mensaje,
              'success'
            );
            this.clienteService.getClientes().subscribe(
              response => {
                this.clientes = response
                LoaderComponent.STATUS = false;
              }
            );
          }
        );
      }
    })
  }

}
