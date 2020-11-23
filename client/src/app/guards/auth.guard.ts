import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router'

import { SecSaludService } from '../services/sec-salud.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor ( private authService: SecSaludService, private router: Router ) {}

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }
    this.router.navigate(['/Login']);
    return false;
  }
}