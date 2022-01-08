import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './loginv2.component.html',
  styleUrls: [],
})
export class Loginv2Component {
  hide = true;

  miFormulario: FormGroup = this.fb.group({
    correo: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  login() {
    // this.authService.validarToken().subscribe( resp => console.log(resp))
    // console.log(this.miFormulario.value);

    const { correo, password } = this.miFormulario.value;

    // this.router.navigateByUrl('/productos');
    this.authService.login(correo, password).subscribe((resp) => {
      // console.log(resp);
      if (resp === 'Login Ok! ') {
        this.router.navigateByUrl('/store/tienda');
      } else {
        // TODO: MOSTRAR MENSAJE DE ERROR
        Swal.fire('Error', resp, 'error');
      }
    });
  }
}
