import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor( private router: Router ) {}

  canActivate(): boolean {
    if(!!localStorage.getItem("tipo")) {
      if (localStorage.getItem("tipo") == "medico") {
        this.router.navigate(['/ProfesionalSalud']);
        return false;
      } else {
        this.router.navigate(['/SecSalud']);
        return false;
      }
    }
    return true;
  }
}
