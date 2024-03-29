import { Component, OnInit,ViewChild, Input, ElementRef } from '@angular/core';

import Cropper from 'cropperjs';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.css']
})
export class ImageCropperComponent implements OnInit {

  @ViewChild('image', { static: false })
  public imageElement!: ElementRef;

  @Input('src')
  public imageSource!: string;

  public imageDestination: string;
  private cropper!: Cropper;

  constructor() {
    this.imageDestination = "";
   }

  ngOnInit(): void {
  }

  public ngAfterViewInit() {
    this.cropper = new Cropper(this.imageElement.nativeElement, {
        zoomable: false,
        scalable: true,
        aspectRatio: 1,
        crop: () => {
            const canvas = this.cropper.getCroppedCanvas();
            this.imageDestination = canvas.toDataURL("image/png");
        }
    });
}

}
