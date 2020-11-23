import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MedicoComponent } from './components/medico/medico.component';
import { RegMedicoComponent } from './components/reg-medico/reg-medico.component';
import { SecSaludComponent } from './components/sec-salud/sec-salud.component';
import { RegPacienteComponent } from './components/reg-paciente/reg-paciente.component';
import { RegPersonaRelacionadaComponent } from './components/reg-persona-relacionada/reg-persona-relacionada.component';
import { RegVisitaComponent } from './components/reg-visita/reg-visita.component';
import { StockMedicamentosComponent } from './components/stock-medicamentos/stock-medicamentos.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { InformeComponent } from './components/informe/informe.component';
import { AuthGuard } from './guards/auth.guard';
import { PacienteGuard } from './guards/paciente.guard';
import { MedicoGuard } from './guards/medico.guard';
import { SecretariaGuard } from './guards/secretaria.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '', //Ruta incial
    redirectTo: '/Login',
    pathMatch: 'full'
  },
  {
    path: 'Login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'SecSalud',
    component: SecSaludComponent,
    canActivate: [SecretariaGuard]
  },
  {
    path: 'ProfesionalSalud',
    component: MedicoComponent,
    canActivate: [MedicoGuard]
  },
  {
    path: 'RegMedico',
    component: RegMedicoComponent,
    canActivate: [SecretariaGuard]
  },
  {
    path: 'RegPaciente',
    component: RegPacienteComponent,
    canActivate: [SecretariaGuard]
  },
  {
    path: 'RegPersonaRelacionada',
    component: RegPersonaRelacionadaComponent,
    canActivate: [SecretariaGuard, PacienteGuard]
  },
  {
    path: 'RegVisita',
    component: RegVisitaComponent,
    canActivate: [MedicoGuard]
  },
  {
    path: 'StockMedicamentos',
    component: StockMedicamentosComponent,
    canActivate: [MedicoGuard]
  },
  {
    path: 'Mapa',
    component: MapaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Informe',
    component: InformeComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
