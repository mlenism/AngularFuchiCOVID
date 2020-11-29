import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder , Validators } from '@angular/forms';

import { VisitaService } from '../../services/visita.service';
import { LaboratorioService } from '../../services/laboratorio.service';
import { MedicamentoService } from '../../services/medicamento.service';
import { StockService } from '../../services/stock.service';

import { IdNombre } from '../../models/id-nombre';
import { Visita } from '../../models/visita';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { MedicoComponent } from '../medico/medico.component';

@Component({
  selector: 'app-reg-visita',
  templateUrl: './reg-visita.component.html',
  styleUrls: ['./reg-visita.component.css']
})
export class RegVisitaComponent implements OnInit {

  form: FormGroup;
  visitaList: Visita[];
  pacienteList: IdNombre[];
  laboratorioList: IdNombre[];
  medicamentoList: IdNombre[];
  stock: string = '0';

  constructor(
    private FormBuilder: FormBuilder,
    private visitaService: VisitaService,
    private laboratorioService: LaboratorioService,
    private medicamentoService: MedicamentoService,
    private stockService: StockService
    ) { 
    this.buildForm();
    this.getVisitas();
    this.llenarPacientes();
    this.llenarLaboratorios();
    this.llenarMedicamentos();
  }

  ngOnInit(): void {}

  private getVisitas() {
    const medico={
      medico: this.form.controls.doctor.value
    }
    this.visitaList = [];
    this.visitaService.getVisita(medico).subscribe(
      res => this.visitaList = res as Visita[],
      err => console.error(err)
    )
  }

  private llenarPacientes() {
    this.pacienteList = [];
    this.visitaService.getVisitaPacientes().subscribe(
      res => this.pacienteList = res as IdNombre[],
      err => console.error(err)
    )
  }

  private llenarLaboratorios() {
    this.laboratorioList = [];
    this.laboratorioService.getLaboratorios().subscribe(
      res => this.laboratorioList = res as IdNombre[],
      err => console.error(err)
    )
  }

  private getStock(laboratorio: string, medicamento: string) {
    const labMed = {
      id_laboratorio: laboratorio,
      id_medicamento: medicamento
    }
    this.stockService.getStock(labMed).subscribe(
      res => this.stock = res.stock,
      err => console.log(err)
    )
  }

  private llenarMedicamentos() {
    this.medicamentoList = [];
    this.medicamentoService.getMedicamentos().subscribe(
      res => this.medicamentoList = res as IdNombre[],
      err => console.error(err)
    )
  }

  private buildForm() {
    this.form = this.FormBuilder.group(
      {
        doctor: JSON.parse(localStorage.getItem("miembro")).id,
        paciente: ['', [Validators.required]],
        temperatura: ['', [Validators.required]],
        peso: ['', [Validators.required]],
        presion: ['', [Validators.required]],
        laboratorio: ['', [Validators.required]],
        medicamento: ['', [Validators.required]],
        dosis: ['', [Validators.required]],
        observaciones: ['', [Validators.required]]
      }
    );
  }

  crear(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    this.visitaService.setVisita(value).subscribe(
      res => {
        this.getVisitas();
        console.log(res);
      },
      err => console.error(err)
    )
  }

  actualizar(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    this.visitaService.updateVisita(value).subscribe(
      res => {
        this.getVisitas();
        console.log(res);
      },
      err => console.error(err)
    )
  }

  borrar(event: Event) {
    event.preventDefault();
    const value =  {
      id_paciente: this.form.value.paciente,
      id_doctor: JSON.parse(localStorage.getItem('miembro')).id
    } 
    this.visitaService.deleteVisita(value).subscribe(
      res => {
        this.getVisitas();
        console.log('BORRADO');
      },
      err => console.error(err)
    )
  }

  editar(visita: Visita) {
    const control = this.form.controls;
    control.paciente.setValue(visita.idpaciente);
    control.temperatura.setValue(visita.temperatura);
    control.peso.setValue(visita.peso);
    control.presion.setValue(visita.presionArterial);
    control.laboratorio.setValue(visita.idlaboratorio);
    control.medicamento.setValue(visita.idMedicamento);
    control.dosis.setValue(visita.dosisDiaria);
    control.observaciones.setValue(visita.observaciones);
    this.getStock(visita.idlaboratorio, visita.idMedicamento);
  }

  tryGetStock() {
    const lab: string = this.form.controls.laboratorio.value;
    const med: string = this.form.controls.medicamento.value;
    if (lab.length != 0 && med.length != 0) {
      this.getStock(lab, med);
    }
  }
}