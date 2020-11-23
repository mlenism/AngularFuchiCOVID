import { Component, OnInit, Input } from '@angular/core';
import { Router} from '@angular/router'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  
  @Input() saludo: string;
  @Input() primerCuadro :string;
  @Input() segundoCuadro :string;
  @Input() primerLink: string;
  @Input() segundoLink: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  cerrar() {
    localStorage.clear();
    this.router.navigate(['/Login']);
  }

}
