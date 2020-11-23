import { Component, OnInit } from '@angular/core';
import { idNombreApellido } from '../../models/id-nombre-apellido';

@Component({
  selector: 'app-sec-salud',
  templateUrl: './sec-salud.component.html',
  styleUrls: ['./sec-salud.component.css']
})
export class SecSaludComponent implements OnInit {
  
  miembro: idNombreApellido = JSON.parse(localStorage.getItem("miembro"))

  constructor() { }

  ngOnInit(): void {
  }

}
