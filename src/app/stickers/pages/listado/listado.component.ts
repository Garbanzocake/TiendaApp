import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

import { StickersService } from '../../services/stickers.service';
import { Sticker } from 'src/app/interfaces/stickers.interface';







@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [],
})
export class ListadoComponent implements OnInit {
  stickers: Sticker[] = [];



  @Input()modo!:string; //recibe admin o user
  get usuario() {
    return this.authService.usuario;
  }

  constructor(
    private stickersService: StickersService,

    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.stickersService.getStickers().subscribe(({ stickers }) => {
      // console.log(productos);
      this.stickers = stickers;
    });


  }
}
