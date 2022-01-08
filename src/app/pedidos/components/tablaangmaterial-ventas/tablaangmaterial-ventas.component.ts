import { Component,AfterViewInit,ViewChild, OnInit } from '@angular/core';


import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


import { Venta } from '../../../interfaces/venta.interface';

import { VentasService } from '../../services/ventas.service';
@Component({
  selector: 'app-tablaangmaterial-ventas',
  templateUrl: './tablaangmaterial-ventas.component.html',
  styleUrls: ['./tablaangmaterial-ventas.component.css']
})
export class TablaangmaterialVentasComponent implements OnInit {
  ventas: Venta[] = [];

  // Tabla angular material
  displayedColumns: string[] = [
    'posicion',
    'cliente',
    'completada',
    'fechaCreacion',
    'total',
  ];
  dataSource!: MatTableDataSource<Venta>;

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private ventasService: VentasService,private _liveAnnouncer: LiveAnnouncer) {
    this.dataSource = new MatTableDataSource();
   }

  ngOnInit(): void {

    this.ventasService.getVentas().subscribe(({ ventas }) => {
      this.ventas = ventas;

      this.dataSource = new MatTableDataSource(this.ventas);
      console.log(this.ventas);
      console.log(this.dataSource) ;
    });

  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
      // This example uses English messages. If your application supports
      // multiple language, you would internationalize these strings.
      // Furthermore, you can customize the message to add additional
      // details about the values being sorted.
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }

}
