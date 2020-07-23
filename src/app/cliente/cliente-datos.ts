export class ClienteDatos {

  public id: number;
  public correo: string;
  public pass: string;
  public usuarioDato = {
    id: 0,
    nombre: "",
    apellido: "",
    fechaNacimiento: ""
  };
  public usuarioHasRolList = [
      {
        id: 0,
        estado: true,
        authority: ""
      }
  ];

}
