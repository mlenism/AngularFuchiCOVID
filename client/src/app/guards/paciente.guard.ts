import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PacienteGuard implements CanActivate {
  
  constructor( private router: Router ) {}

  canActivate(): boolean {
    if (!!localStorage.getItem("paciente")) {
      return true;
    }
    this.router.navigate(['/RegPaciente']);
    return false;
  }
}