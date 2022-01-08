import { Component, OnInit, Input } from '@angular/core';
import { Venta } from '../../../interfaces/venta.interface';
import { VentasService } from '../../services/ventas.service';

@Component({
  selector: 'app-tabla-ventas',
  templateUrl: './tabla-ventas.component.html',
  styleUrls: ['./tabla-ventas.component.css'],
})
export class TablaVentasComponent implements OnInit {
  ventas: Venta[] = [];
  @Input() filtro?: string;

  constructor(private ventasService: VentasService) {}

  ngOnInit(): void {
    if (this.filtro === 'Incompletas') {
      this.ventasService.getVentasSinCompletar().subscribe(({ ventas }) => {
        this.ventas = ventas;
      });
    } else if (this.filtro === 'Completas') {
      this.ventasService.getVentasCompletadas().subscribe(({ ventas }) => {
        this.ventas = ventas;
      });
    } else {
      this.ventasService.getVentas().subscribe(({ ventas }) => {
        this.ventas = ventas;

        // console.log(this.ventas);
      });
    }
  }
}
