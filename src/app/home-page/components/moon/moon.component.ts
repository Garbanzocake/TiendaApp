import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-moon',
  templateUrl: './moon.component.html',
  styleUrls: ['./moon.component.css'],
})
export class MoonComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  estadoLuna: string = '';

  ngOnInit(): void {
    if (this.router.url.includes('tienda')) {
      this.estadoLuna = 'tienda';
    } else if (this.router.url.includes('servicios')) {
      this.estadoLuna = 'servicios';
    } else {
      this.estadoLuna = 'cohete';
    }
  }

  //Animacion cohete desplazado
  onClickedBomb(){

    let tl =gsap.timeline();


    tl.to('#bombaimg1',{
      duration: 3,
      y:-100,
      x:200,
      scale:1.5,
      ease:'sine'
    });

    tl.to('#bombaimg1',{
      duration: 6,
      rotation: 80,
      scale:0.5,
      x:600,
      y:400,
      ease:'sine'
    });

    // setTimeout(this.redireccion, 10000);

  }

  //Animacion escalado
  onClickedBomb2(){

    let tl =gsap.timeline();


    tl.to('#bombaimg2',{
      duration: 1,
      scale:1.5,
      ease:'sine'
    });

    tl.to('#bombaimg2',{
      duration: 1,
      opacity:0,
      scale:1.0,
      ease:'sine'
    });

    // setTimeout(this.redireccion,4000);
  }

  redireccion(){
    window.location.replace('/store/landingPage')
  }







}
