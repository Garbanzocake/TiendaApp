import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
    .container{
      margin: 10px ;

    }
    `
  ]
})





export class HomeComponent implements OnInit {



  get usuario(){
    return this.authService.usuario;
  }

  constructor(private router:Router,private authService:AuthService) { }

  ngOnInit(): void {

  }

  logOut(){
    this.authService.logout();
    this.router.navigateByUrl('/home/landingPage');
  }

}
