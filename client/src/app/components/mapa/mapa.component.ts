import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  constructor(private router: Router) { }

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

}
