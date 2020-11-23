import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'

import { SecSaludService } from 'src/app/services/sec-salud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private FormBuilder: FormBuilder,
    private secSaludService: SecSaludService,
    private router: Router
    ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.FormBuilder.group({
      id: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    this.secSaludService.singIn(value).subscribe(
      res => {
        if (res == 'Usuario o contraseña incorrecto'){
          window.alert(res);
        } else {
          localStorage.setItem('miembro',  JSON.stringify(res.miembro));
          localStorage.setItem('tipo', res.tipo);
          if (res.tipo == 'secretaria') {
            this.router.navigate(['/SecSalud']);
          } else {
            this.router.navigate(['/ProfesionalSalud']);
          }
        }
      },
      err => console.error(err)
    );
  }

}
