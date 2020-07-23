import { Component, OnInit } from '@angular/core';
import { ClienteService} from '../cliente/cliente.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public correo: String;
  public pass: String;

  constructor(private clienteService: ClienteService, private router: Router) { }

  ngOnInit(): void {
    /*if(this.clienteService.logInValid()) {
      this.router.navigate(["/cliente"]);
    }*/
  }

  public login():void {
    /*this.clienteService.login(this.correo, this.pass).subscribe(
      succes => {
        this.clienteService.saveToken(succes.Token);
        Swal.fire("¡Bienvenido!", "", "success");
        this.router.navigate(["/cliente"]);
      }
    );*/
  }

}
