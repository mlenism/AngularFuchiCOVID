import { Component, OnInit } from '@angular/core';

import { StockService } from '../../services/stock.service'

import { LabStock } from '../../models/lab-stock'

@Component({
  selector: 'app-stock-medicamentos',
  templateUrl: './stock-medicamentos.component.html',
  styleUrls: ['./stock-medicamentos.component.css']
})
export class StockMedicamentosComponent implements OnInit {

  stockList: LabStock[];

  constructor(private stockService: StockService) {
    this.getAllStock();
  }

  ngOnInit(): void {
  }

  private getAllStock() {
    this.stockList = [];
    this.stockService.getLabMed().subscribe(
      res => this.stockList = res as LabStock[],
      err => console.error(err)
    )
  }

}
