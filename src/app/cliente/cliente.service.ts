import { Injectable } from '@angular/core';
import { ClienteDatos } from './cliente-datos';
import { Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ClienteObject } from './form/cliente-object';
import { catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';

@Injectable()
export class ClienteService {

  private urlEndPoint:string = "http://localhost:8080/api/cliente/";
  private httpHeaders: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"/*,
    "Authorization" : "Bearer " + localStorage.getItem("auth_token")*/
  });

  constructor(private http: HttpClient, private router: Router) { }

  public getClientes(): Observable<ClienteDatos[]>{
    return this.http.get<ClienteDatos[]>(this.urlEndPoint + "findAll").pipe(
      catchError(e => {
        swal.fire("Error al consultar los clientes", e.error.mensaje, "error");
        LoaderComponent.STATUS = false;
        return throwError(e);
      })
    );
  }

  public create (cliente: ClienteObject): Observable<any> {
    return this.http.post<any>(this.urlEndPoint + "create", cliente, {headers: this.httpHeaders}).pipe(
      catchError(
        e => {
          if(e.status == 400){
            return throwError(e);
          }
          swal.fire("¡Error!", e.error.mensaje, "error");
          LoaderComponent.STATUS = false;
          return throwError(e);
        }
      )
    );
  }

  public delete (id: Number): Observable<any> {
    return this.http.delete<any>( this.urlEndPoint + "delete/" + id).pipe(
      catchError(
        e => {
          swal.fire("¡Error!", e.error.mensaje, "error");
          LoaderComponent.STATUS = false;
          return throwError(e);
        }
      )
    );
  }

  public findById (id: Number): Observable<ClienteDatos>{
    return this.http.get<ClienteDatos>(this.urlEndPoint + "findById/" + id).pipe(
      catchError(e => {
        swal.fire("¡Error!", e.error.mensage, "error");
        LoaderComponent.STATUS = false;
        this.router.navigate(["/cliente"]);
        return throwError(e);
      })
    );
  }

  public update (clienteDatos: ClienteDatos): Observable<any> {
      return this.http.put<any>(this.urlEndPoint + "update", clienteDatos).pipe(
        catchError(
          e => {
            if(e.status == 400) {
              return throwError(e);
            }
            swal.fire("¡Error!", e.error.mensaje, "error");
            LoaderComponent.STATUS = false;
            this.router.navigate(["/cliente"]);
            return throwError(e);
          }
        )
      );
  }

  /*public login(correo: String, pass: String): Observable<any>{
     return this.http.post<any>("http://localhost:8080/api/login", {correo: correo, pass: pass});
  }

  public logInValid(): boolean{
    return localStorage.getItem("auth_token") != null;
  }

  public saveToken(token: any): void{
    localStorage.setItem("auth_token", token);
  }
  */
}
