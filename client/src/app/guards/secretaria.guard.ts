import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SecretariaGuard implements CanActivate {

  constructor( private router: Router ) {}

  canActivate(): boolean {
    if(!!localStorage.getItem("tipo")) {
      if (localStorage.getItem("tipo") == "medico") {
        this.router.navigate(['/ProfesionalSalud']);
        return false;
      } else {
        return true;
      }
    }
    this.router.navigate(['/Login']);
    return false;
  }
}
