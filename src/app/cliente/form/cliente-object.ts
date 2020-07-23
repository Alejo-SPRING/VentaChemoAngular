export class ClienteObject {

  public id: number;
  public estado: boolean;
  public authority: string;
  public usuarioLogin = {
    id: null,
    correo: "",
    pass: "",
    usuarioDato: {
      nombre: "",
      apellido: "",
      fechaNacimiento: ""
    }
  }

  constructor(){

  }

}
