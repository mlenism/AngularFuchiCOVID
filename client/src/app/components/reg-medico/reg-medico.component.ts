import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder , Validators } from '@angular/forms';

import { TipoIDService } from '../../services/tipo-id.service';
import { BarrioService } from '../../services/barrio.service';
import { UniverisidadService } from '../../services/univerisidad.service';
import { EntidadSaludService } from '../../services/entidad-salud.service';
import { MedicoService } from '../../services/medico.service';

import { Medico } from '../../models/medico';
import { IdNombre } from '../../models/id-nombre';

@Component({
  selector: 'app-reg-medico',
  templateUrl: './reg-medico.component.html',
  styleUrls: ['./reg-medico.component.css']
})
export class RegMedicoComponent implements OnInit {

  form: FormGroup;
  medicoList: Medico[];
  barrioList: IdNombre[];
  tipoIDlist: IdNombre[];
  universidadList: IdNombre[];
  entidadList: IdNombre[];

  constructor(
    private FormBuilder: FormBuilder,
    private medicoService: MedicoService,
    private tipoIDService: TipoIDService,
    private barrioService: BarrioService,
    private universidadService: UniverisidadService,
    private entidadService: EntidadSaludService
    ) { 
    this.buildForm();
    this.getProfesional();
    this.llenarBarrio();
    this.llenarTipoId();
    this.llenarUniversidad();
    this.llenarEntidadSalud();
  }

  ngOnInit(): void {}

  private getProfesional() {
    this.medicoList = [];
    this.medicoService.getMedicos().subscribe(
      res => this.medicoList = res as Medico[],
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
  
  private llenarUniversidad() {
    this.universidadList = [];
    this.universidadService.getUniversidades().subscribe(
      res => this.universidadList = res as IdNombre[],
      err => console.error(err)
    )
  }

  private llenarEntidadSalud() {
    this.entidadList = [];
    this.entidadService.getEntidades().subscribe(
      res => this.entidadList = res as IdNombre[],
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
        contrasenia: ['', [Validators.required]],
        direccion: ['', [Validators.required]],
        barrio: ['', [Validators.required]],
        tipoID: ['', [Validators.required]],
        universidad: ['', [Validators.required]],
        entidad: ['', [Validators.required]]
      }
    );
  }

  crear(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    this.medicoService.setMedico(value).subscribe(
      res => {
        if (res == 'CONSTRAINT "profesional_salud_pkey"') {
          window.alert('La acción no se puede ejecutar debido a que ya existe un profesional de salud con la misma cedula');
        } else {
          this.getProfesional();
        }
      },
      err => console.error(err)
    )
  }

  actualizar(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    this.medicoService.updateMedico(value).subscribe(
      res => {
        this.getProfesional();
      },
      err => console.error(err)
    )
  }

  borrar(event: Event) {
    event.preventDefault();
    const value = this.form.value.id;
    this.medicoService.deleteMedico(value).subscribe(
      res => {
        if (res == 'CONSTRAINT "FK_medico"') {
          window.alert('La acción no se puede ejecutar debido a que hay un paciente siendo atendido por este profesional de la salud');
        } else {
          this.getProfesional();
        }
      },
      err => console.error(err)
    )
  }

  editar(medico: Medico) {
    const control = this.form.controls;
    control.id.setValue(medico.id);
    control.nombre.setValue(medico.nombre);
    control.apellido.setValue(medico.apellido);
    control.contrasenia.setValue(medico.contrasenia);
    control.direccion.setValue(medico.direccion);
    control.barrio.setValue(medico.idBarrio);
    control.tipoID.setValue(medico.idTipoID);
    control.universidad.setValue(medico.idUniversidad);
    control.entidad.setValue(medico.idEntidad);
  }
}