import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';



@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate ,CanLoad{
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):   Observable<boolean> | Promise<boolean> | boolean  {

    return this.authService.validarAdmin()
    .pipe(
      tap(esAdmin =>{
        if (!esAdmin) {
          this.router.navigateByUrl('/store/tienda')
        }
      })
    )




  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.validarAdmin()
    .pipe(
      tap(esAdmin =>{
        if (!esAdmin) {
          this.router.navigateByUrl('/store/tienda')
        }
      })
    )


  }
}
