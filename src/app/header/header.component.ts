import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  public titulo: String = "VentasChamo";

  constructor() {

  }

  ngOnInit(): void {
  }

}
