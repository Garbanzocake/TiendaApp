import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import {gsap} from 'gsap';





@Component({
  selector: 'app-thebomb1',
  templateUrl: './thebomb1.component.html',
  styleUrls: ['./thebomb1.component.css'],
})
export class Thebomb1Component implements OnInit {

  @ViewChild('bombadiv',{static:true}) bomba!: ElementRef<HTMLDivElement>;

  constructor() {}

  ngOnInit(): void {

  }

  onClickeBomb(){

    let tl =gsap.timeline();


    tl.to('#bombaimg',{
      duration: 1,
      scale:1.5,
      ease:'sine'
    });

    tl.to('#bombaimg',{
      duration: 1,
      opacity:0,
      scale:1.0,
      ease:'sine'
    });






    setTimeout(this.redireccion,4000);
  }

  redireccion(){
    window.location.replace('/store/landingPage')
  }




}
