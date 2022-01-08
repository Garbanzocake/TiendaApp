import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/auth.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {
  UsuarioResult,
  usuarioEncontrado,

} from '../interfaces/usuarioResult.interface';
import { UsuarioRegist } from '../interfaces/authRegis.interface';
import { TiempoTokenResp } from '../interfaces/auth.interface';
import { UsuarioEnvio } from '../interfaces/usuarioResult.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _auth: AuthResponse | undefined;
  private _authR: UsuarioRegist | undefined;
  private _usuario!: Usuario;
  private _admin!: usuarioEncontrado;

  get usuario() {
    return { ...this._usuario };
  }

  get auth(): AuthResponse {
    return { ...this._auth! };
  }
  get authR(): UsuarioRegist {
    return { ...this._authR! };
  }

  get admin(): usuarioEncontrado {
    return { ...this._admin! };
  }

  constructor(private http: HttpClient) { }

  validarToken(): Observable<boolean> {
    // Api proveedora
    const url = `${this.baseUrl}/auth/renew`;
    //Parametros headers a preguntar
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('x-token') || ''
    );

    return this.http.get<UsuarioResult>(url, { headers }).pipe(
      map((resp) => {
        this._usuario = {
          nombre: resp.nombre!,
          uid: resp._id,
          correo: resp.correo!,
          rol: resp.rol,
          telefono:resp.telefono!
        };

        return true;
      }),
      catchError((err) => of(false))
    );
  }

  validarAdmin(): Observable<boolean> {
    const { uid } = this._usuario;
    const url = `${this.baseUrl}/usuarios/${uid}`;

    return this.http.get<usuarioEncontrado>(url).pipe(
      map((resp) => {
        if (resp.usuario.rol === 'ADMIN_ROLE') {
          return true;
        } else {
          return false;
        }
      }),
      catchError((err) => of(false))
    );
  }

  validarSesion(): Observable<UsuarioResult> {
    const url = `${this.baseUrl}/auth/renew`;

    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('x-token') || ''
    );

    return this.http.get<UsuarioResult>(url, { headers }).pipe(
      tap((resp) => {
        this._usuario = {
          nombre: resp.nombre,
          uid: resp._id,
          correo: resp.correo,
          rol: resp.rol,
          telefono:resp.telefono
        };


        localStorage.setItem('x-token', resp.token);
      })
    );
  }

  validarTiempoToken(): Observable<TiempoTokenResp> {
    const url = `${this.baseUrl}/auth/expired`;

    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('x-token') || ''
    );

    return this.http.get<TiempoTokenResp>(url, { headers });
  }

  login(correo: string, password: string) {
    const url = `${this.baseUrl}/auth/login`;
    const body = {
      correo,
      password,
    };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap((auth) => (this._auth = auth)),
      tap((resp) => {
        if (resp.msg === 'Login Ok! ') {
          // Agregando el token al localstorage
          localStorage.setItem('x-token', resp.token!);

          this._usuario = {
            nombre: resp.usuario!.nombre!,
            uid: resp.usuario!.uid!,
            correo: resp.usuario!.correo!,
            rol: resp.usuario!.rol!,
            telefono:resp.usuario!.telefono!
          };
        }
      }),
      map((resp) => resp.msg),
      catchError((err) => of(err.error.msg))
    );
  }

  registro(usuario:UsuarioEnvio  ) {
    const url = `${this.baseUrl}/usuarios`;
    // const body = {
    //   nombre,
    //   correo,
    //   password,
    //   rol,
    // };

    return this.http.post<UsuarioRegist>(url, usuario).pipe(
      tap((resp) => {
        if (resp.ok === true) {
          // Agregando el token al localstorage
          localStorage.setItem('x-token', resp.token!);
          this._usuario = {
            nombre: resp.usuario.nombre,
            uid: resp.usuario.uid,
            correo: resp.usuario.correo,
            telefono:resp.usuario.telefono
          };
        }
      }),
      catchError((err) => of(err.error.msg))
    );
  }

  logout() {
    // localStorage.clear();
    localStorage.setItem('x-token', '');
    location.reload();
  }
}
