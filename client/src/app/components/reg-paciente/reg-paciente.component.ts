import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder , Validators } from '@angular/forms';
import { Router } from '@angular/router'

import { TipoIDService } from '../../services/tipo-id.service';
import { BarrioService } from '../../services/barrio.service';
import { MedicoService } from '../../services/medico.service';
import { PacienteService } from '../../services/paciente.service';

import { IdNombre } from '../../models/id-nombre';
import { Paciente } from '../../models/paciente'

@Component({
  selector: 'app-reg-paciente',
  templateUrl: './reg-paciente.component.html',
  styleUrls: ['./reg-paciente.component.css']
})
export class RegPacienteComponent implements OnInit {
  
  form: FormGroup;
  medicoList: IdNombre[];
  pacienteList: Paciente[];
  barrioList: IdNombre[];
  tipoIDlist: IdNombre[];

  constructor(
    private FormBuilder: FormBuilder,
    private medicoService: MedicoService,
    private tipoIDService: TipoIDService,
    private barrioService: BarrioService,
    private pacienteService: PacienteService,
    private router: Router
    ) { 
    this.buildForm();
    this.getPacientes();
    this.getProfesional();
    this.llenarBarrio();
    this.llenarTipoId();
  }

  ngOnInit(): void {}
  
  private getPacientes() {
    this.pacienteList = [];
    this.pacienteService.getPacientes().subscribe(
      res => this.pacienteList = res as Paciente[],
      err => console.error(err)
    )
  }

  private getProfesional() {
    this.medicoList = [];
    this.medicoService.getMedicosFullName().subscribe(
      res => this.medicoList = res as IdNombre[],
      err => console.error(err)
    )
  }

  private llenarBarrio() {
    this.barrioList = [];
    this.barrioService.getBarrios().subscribe(
      res => this.barrioList = res as IdNombre[],
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
        id_miembro_secretaria: JSON.parse(localStorage.getItem('miembro')).id,
        id: ['', [Validators.required]],
        nombre: ['', [Validators.required]],
        apellido: ['', [Validators.required]],
        medico: ['', [Validators.required]],
        direccion: ['', [Validators.required]],
        barrio: ['', [Validators.required]],
        tipoID: ['', [Validators.required]],
        integrantes: ['', [Validators.required]],
        ciudad: ['', [Validators.required]],
        latitud: ['', [Validators.required]],
        longitud: ['', [Validators.required]]
      }
    );
  }

  crear(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    this.pacienteService.setPaciente(value).subscribe(
      res => {
        this.getPacientes();
        console.log(res);
      },
      err => console.error(err)
    )
  }

  actualizar(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    this.pacienteService.updatePaciente(value).subscribe(
      res => {
        this.getPacientes();
        console.log(res);
      },
      err => console.error(err)
    )
  }

  borrar(event: Event) {
    event.preventDefault();
    const value = this.form.value.id;
    this.pacienteService.deletePaciente(value).subscribe(
      res => {
        this.getPacientes();
        console.log(res);
      },
      err => console.error(err)
    )
  }

  editar(paciente: Paciente) {
    const control = this.form.controls;
    control.id.setValue(paciente.id);
    control.nombre.setValue(paciente.nombre);
    control.apellido.setValue(paciente.apellido);
    control.medico.setValue(paciente.idMedico);
    control.direccion.setValue(paciente.direccion);
    control.barrio.setValue(paciente.idBarrio);
    control.tipoID.setValue(paciente.idTipoID);
    control.integrantes.setValue(paciente.integrantes);
    control.ciudad.setValue(paciente.ciudad);
    control.latitud.setValue(paciente.latitud);
    control.longitud.setValue(paciente.longitud);
  }

  regPersonaRelacionada(event: Event) {
    event.preventDefault();
    const control = this.form.controls;
    const paciente = {
      id: control.id.value,
      nombre: control.nombre.value,
      apellido: control.apellido.value
    }
    localStorage.setItem('paciente', JSON.stringify(paciente));
    this.router.navigate(['/RegPersonaRelacionada']);
  }
}