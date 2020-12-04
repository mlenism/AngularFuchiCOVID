import { Component } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels'

import { EstadisticasService } from '../../services/estadisticas.service'
import { IdNombre } from 'src/app/models/id-nombre';

@Component({
  selector: 'app-diagrama-infectados-barrio',
  templateUrl: './diagrama-infectados-barrio.component.html',
  styleUrls: ['./diagrama-infectados-barrio.component.css']
})
export class DiagramaInfectadosBarrioComponent {


  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Infectados por barrio' }
  ];

  constructor(private estadisticasService: EstadisticasService) {
    this.getInfectadosBarrio();
  }

  private getInfectadosBarrio() {
    this.estadisticasService.getInfectadosXBarrio().subscribe(
      res => {
        const estadisticasList: IdNombre[] = res as IdNombre[];
        estadisticasList.forEach(element => {
          this.barChartLabels.push(element.id);
          this.barChartData[0].data.push(Number.parseInt(element.nombre));
        });
      },
      err => console.error(err)
    )
  }
}
