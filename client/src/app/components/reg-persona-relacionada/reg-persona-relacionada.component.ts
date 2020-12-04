import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder , Validators } from '@angular/forms';
import { Router } from '@angular/router'

import { TipoIDService } from '../../services/tipo-id.service';
import { FamiliarService } from '../../services/familiar.service';

import { IdNombre } from '../../models/id-nombre';
import { idNombreApellido } from '../../models/id-nombre-apellido'
import { PersonaRelacionada } from '../../models/persona-relacionada'

@Component({
  selector: 'app-reg-persona-relacionada',
  templateUrl: './reg-persona-relacionada.component.html',
  styleUrls: ['./reg-persona-relacionada.component.css']
})
export class RegPersonaRelacionadaComponent implements OnInit {

  paciente: idNombreApellido = JSON.parse(localStorage.getItem("paciente"));
  form: FormGroup;
  familiarList: PersonaRelacionada[];
  tipoIDlist: IdNombre[];

  constructor(
    private FormBuilder: FormBuilder,
    private tipoIDService: TipoIDService,
    private familiarService: FamiliarService,
    private router: Router
    ) { 
    this.buildForm();
    this.getFamiliares();
    this.llenarTipoId();
  }

  ngOnInit(): void {}

  private getFamiliares() {
    const pac = { id_paciente: JSON.parse(localStorage.getItem("paciente")).id }
    this.familiarList = [];
    this.familiarService.getPersonaRelacionada(pac).subscribe(
      res => this.familiarList = res as PersonaRelacionada[],
      err => console.error(err)
    )
  }

  private llenarTipoId() {
    this.tipoIDlist = [];
    this.tipoIDService.getTiposID().subscribe(
      res => this.tipoIDlist = res as IdNombre[],
      err => console.error(err)
    )
  }

  private buildForm() {
    this.form = this.FormBuilder.group(
      {
        id_paciente: JSON.parse(localStorage.getItem("paciente")).id,
        id: ['', [Validators.required]],        
        nombre: ['', [Validators.required]],
        apellido: ['', [Validators.required]],
        email: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
        parentesco: ['', [Validators.required]],
        tipoID: ['', [Validators.required]]
      }
    );
  }

  crear(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    this.familiarService.setPersonaRelacionada(value).subscribe(
      res => {
        if (res == 'CONSTRAINT "familiar_pkey"') {
          window.alert('La acción no se puede ejecutar debido a que ya existe alguien con la misma cedula');
        } else {
          this.getFamiliares();
        }
        console.log(res);
      },
      err => console.error(err)
    )
  }

  actualizar(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    this.familiarService.updatePersonaRelacionada(value).subscribe(
      res => {
        this.getFamiliares();
        console.log(res);
      },
      err => console.error(err)
    )
  }

  borrar(event: Event) {
    event.preventDefault();
    const value = {
      id_paciente: JSON.parse(localStorage.getItem("paciente")).id,
      id_familiar: this.form.value.id
    }
    this.familiarService.deletePersonaRelacionada(value).subscribe(
      res => {
        this.getFamiliares();
        console.log(res);
      },
      err => console.error(err)
    )
  }
  
  volver(event: Event) {
    event.preventDefault();
    this.router.navigate(['/RegPaciente']);
    localStorage.removeItem("paciente");
  }

  editar(familiar: PersonaRelacionada) {
    const control = this.form.controls;
    control.id.setValue(familiar.id);
    control.nombre.setValue(familiar.nombre);
    control.apellido.setValue(familiar.apellido);
    control.email.setValue(familiar.email);
    control.telefono.setValue(familiar.telefono);
    control.parentesco.setValue(familiar.parentesco);
    control.tipoID.setValue(familiar.idTipoID);
  }
}