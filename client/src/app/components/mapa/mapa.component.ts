import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UbicacionPacienteService } from 'src/app/services/ubicacion_paciente.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  lat: number=3.425396;
  lng: number=-76.519767;
  zoom: number=11.5;
  ubicaciones: any[];

  constructor(private router: Router, private ubicacionPacienteService:UbicacionPacienteService) { 

  }

  ngOnInit(): void {
    //this.ubicacionPacienteService.getUbicacionPacientes().then(pacientes=>console.log(pacientes))
    this.ubicacionPacienteService.getUbicacionPacientes().then(pacientes=>this.ubicaciones=pacientes)
    .catch(error=> console.log(error));
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