import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  public static STATUS: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public getStatus(): boolean{
    return LoaderComponent.STATUS;
  }

}
