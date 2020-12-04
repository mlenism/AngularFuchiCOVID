import { Component } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels'

import { EstadisticasService } from '../../services/estadisticas.service'
import { IdNombre } from 'src/app/models/id-nombre';

@Component({
  selector: 'app-diagrama-infectados-edad',
  templateUrl: './diagrama-infectados-edad.component.html',
  styleUrls: ['./diagrama-infectados-edad.component.css']
})
export class DiagramaInfectadosEdadComponent {

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
    { data: [], label: 'Infectados por edad' }
  ];

  public chartColors:Array<any> =[
    {
      backgroundColor: 'rgba(196,237,233,0.6)',
      borderColor: 'rgba(196,237,233,0.6)',
      pointBackgroundColor: 'rgba(196,237,233,0.6)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(196,237,233,0.6)'
    }
  ];

  constructor(private estadisticasService: EstadisticasService) {
    this.getInfectadosEdad();
  }

  private getInfectadosEdad() {
    this.estadisticasService.getInfectadosXEdad().subscribe(
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
