import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cuadro-de-entrada',
  templateUrl: './cuadro-de-entrada.component.html',
  styleUrls: ['./cuadro-de-entrada.component.css']
})
export class CuadroDeEntradaComponent implements OnInit {

  @Input() mensaje: string;
  @Input() enlace: string;

  constructor() { }

  ngOnInit(): void {
  }

}
