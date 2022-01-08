import { Component, OnInit } from '@angular/core';

import { StickersService } from '../../../stickers/services/stickers.service';
import { Sticker } from '../../../interfaces/stickers.interface';

@Component({
  selector: 'app-slider-stickers',
  templateUrl: './slider-stickers.component.html',
  styleUrls: ['./slider-stickers.component.css'],
})
export class SliderStickersComponent implements OnInit {
  stickers: Sticker[] = [];
  constructor(private stickersService: StickersService) {}

  ngOnInit(): void {
    this.stickersService.getStickers().subscribe(({ stickers }) => {
      // console.log(productos);
      this.stickers = stickers;
    });
  }
}
