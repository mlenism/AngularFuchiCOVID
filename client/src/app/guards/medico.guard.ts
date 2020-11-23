import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MedicoGuard implements CanActivate {

  constructor( private router: Router ) {}

  canActivate(): boolean {
    if(!!localStorage.getItem("tipo")) {
      if (localStorage.getItem("tipo") == "medico") {
        return true;
      } else {
        this.router.navigate(['/SecSalud']);
        return false;
      }
    }
    this.router.navigate(['/Login']);
    return false;
  }
}
