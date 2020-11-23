import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { EstadisticasService } from '../../services/estadisticas.service'

import { IdNombre } from '../../models/id-nombre';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css']
})
export class InformeComponent implements OnInit {

  estadisticasList: IdNombre[];

  constructor(private router: Router, private estadisticasService: EstadisticasService) {
    this.getAllestadisticas();
  }

  ngOnInit(): void {
  }

  volver(event: Event) {
    event.preventDefault();
    const miembro: string = localStorage.getItem('tipo');
    if (miembro == "medico") {
      this.router.navigate(['/ProfesionalSalud']);
    } else {
      this.router.navigate(['/SecSalud']);
    }
  }

  private getAllestadisticas() {
    this.estadisticasList = [];
    this.estadisticasService.getEstadisticas().subscribe(
      res => this.estadisticasList = res as IdNombre[],
      err => console.error(err)
    )
  }

}
