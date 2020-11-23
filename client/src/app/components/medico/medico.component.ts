import { Component, OnInit } from '@angular/core';
import { idNombreApellido } from '../../models/id-nombre-apellido'

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  medico: idNombreApellido = JSON.parse(localStorage.getItem("miembro"))

  constructor() { }

  ngOnInit(): void {
  }

}
