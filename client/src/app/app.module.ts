import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule} from '@agm/core';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { FondoComponent } from './components/fondo/fondo.component';
import { SecSaludComponent } from './components/sec-salud/sec-salud.component';
import { CuadroDeEntradaComponent } from './components/cuadro-de-entrada/cuadro-de-entrada.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MedicoComponent } from './components/medico/medico.component';
import { RegMedicoComponent } from './components/reg-medico/reg-medico.component';

import { TipoIDService } from './services/tipo-id.service';
import { BarrioService } from './services/barrio.service';
import { UniverisidadService } from './services/univerisidad.service';
import { EntidadSaludService } from './services/entidad-salud.service';
import { LaboratorioService } from './services/laboratorio.service';
import { FamiliarService } from './services/familiar.service';
import { MedicoService } from './services/medico.service';
import { PacienteService } from './services/paciente.service';
import { VisitaService } from './services/visita.service';
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
import { DiagramaInfectadosBarrioComponent } from './components/diagrama-infectados-barrio/diagrama-infectados-barrio.component';
import { DiagramaInfectadosEdadComponent } from './components/diagrama-infectados-edad/diagrama-infectados-edad.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FondoComponent,
    SecSaludComponent,
    CuadroDeEntradaComponent,
    InicioComponent,
    MedicoComponent,
    RegMedicoComponent,
    RegPacienteComponent,
    RegPersonaRelacionadaComponent,
    RegVisitaComponent,
    StockMedicamentosComponent,
    MapaComponent,
    InformeComponent,
    DiagramaInfectadosBarrioComponent,
    DiagramaInfectadosEdadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCUtMHRooNwcLksKKoG8fk9BvG1Z2C0tog'
    })
  ],
  providers: [
    TipoIDService,
    BarrioService,
    UniverisidadService,
    EntidadSaludService,
    LaboratorioService,
    FamiliarService,
    MedicoService,
    PacienteService,
    VisitaService,
    AuthGuard,
    PacienteGuard,
    MedicoGuard,
    SecretariaGuard,
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
