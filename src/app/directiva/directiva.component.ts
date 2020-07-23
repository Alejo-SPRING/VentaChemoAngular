import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent {

  listaCurso: string[] = ["TypeScript", "JavaScript", "Java", "Spring", "PHP"];
  estado: boolean = true;

  constructor() { }

  public habilitar():void {
    this.estado = (this.estado == true)?false:true;
  }

}
