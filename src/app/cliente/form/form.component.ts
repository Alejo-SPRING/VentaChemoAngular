import { Component, OnInit } from '@angular/core';
import { ClienteObject } from './cliente-object';
import { ClienteService} from '../cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ClienteDatos } from '../cliente-datos';
import { LoaderComponent } from '../../loader/loader.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public titulo:string = "Crear cliente";
  public cliente:ClienteObject = new ClienteObject();
  public passV:String;
  public clienteDatos: ClienteDatos = new ClienteDatos();
  private errors: string[];

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) {
    LoaderComponent.STATUS = true;
   }

  ngOnInit(): void {
    /*if(this.clienteService.logInValid() == false) {
      Swal.fire("¡Inicia sesión por favor!", "", "info");
      this.router.navigate(["/login"]);
    }*/
    this.selectCliente();
    LoaderComponent.STATUS = false;
  }

  public selectCliente():void {
    this.activatedRoute.params.subscribe(
      response => {
        if(response["id"]) {
          this.clienteService.findById(response["id"]).subscribe(
            response => {
              this.cliente.id = response.usuarioHasRolList[0].id;
              this.cliente.authority = response.usuarioHasRolList[0].authority;
              this.cliente.estado = response.usuarioHasRolList[0].estado;
              this.cliente.usuarioLogin.id = response.id;
              this.cliente.usuarioLogin.correo = response.correo;
              this.cliente.usuarioLogin.usuarioDato.apellido = response.usuarioDato.apellido;
              this.cliente.usuarioLogin.usuarioDato.nombre = response.usuarioDato.nombre;
              this.cliente.usuarioLogin.usuarioDato.fechaNacimiento = response.usuarioDato.fechaNacimiento;
              this.titulo = "Actualizar cliente";
            }
          );
        }
      }
    );
  }

  public update():void {
    if(this.cliente.usuarioLogin.pass == this.passV) {
      this.clienteDatos.usuarioHasRolList[0].id = this.cliente.id;
      this.clienteDatos.usuarioHasRolList[0].authority = this.cliente.authority;
      this.clienteDatos.usuarioHasRolList[0].estado = this.cliente.estado;
      this.clienteDatos.id = this.cliente.usuarioLogin.id;
      this.clienteDatos.correo = this.cliente.usuarioLogin.correo;
      this.clienteDatos.pass = this.cliente.usuarioLogin.pass;
      this.clienteDatos.usuarioDato.apellido = this.cliente.usuarioLogin.usuarioDato.apellido;
      this.clienteDatos.usuarioDato.nombre = this.cliente.usuarioLogin.usuarioDato.nombre;
      this.clienteDatos.usuarioDato.fechaNacimiento = this.cliente.usuarioLogin.usuarioDato.fechaNacimiento;
      LoaderComponent.STATUS = true;
      this.clienteService.update(this.clienteDatos).subscribe(
        response => {
          Swal.fire("¡Actualizado!", response.mensaje, "success");
          LoaderComponent.STATUS = false;
          this.router.navigate(["/cliente"]);
        }
      );
    } else {
      Swal.fire("¡Error!", "¡Las contraseñas no coinciden!", "error");
    }
  }

  public create():void {
    if(this.cliente.usuarioLogin.pass == this.passV) {
      LoaderComponent.STATUS = true;
      this.clienteService.create(this.cliente).subscribe(
        response => {
          Swal.fire('¡Cliente creado!', response.mensaje, 'success');
          LoaderComponent.STATUS = false;
          this.router.navigate(["/cliente"]);
        },
        err => {
          this.errors = err.error.mensaje as string[];
          let mensaje = this.errors.map(e => {
            var temporal = "";
            temporal = temporal + e;
            return temporal;
          });
          Swal.fire("¡Error " + err.status + "!", mensaje.toString(), "error");
          LoaderComponent.STATUS = false;
        }
      );
    } else {
      Swal.fire("¡Error!", "Las contraseñas no coinciden!", "error");
    }
  }

}
