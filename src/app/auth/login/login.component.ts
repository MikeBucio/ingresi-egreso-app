import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NotificacionesService } from '../../services/notificaciones-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup

  constructor(private fb: FormBuilder,private authService: AuthService, 
              private router: Router, private notificacionesService: NotificacionesService) { }

  ngOnInit(): void {
    this.crearFormulario()
  }

  crearFormulario(){
    this.formLogin = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  iniciarSesion(){
    this.notificacionesService.activarDesactivarLoader('activar');
    this.authService.logIn(this.formLogin.value).then(resp => {
      console.log(resp)
      this.router.navigateByUrl('/')
      this.notificacionesService.activarDesactivarLoader('desactivar');
    }).catch( err =>{
      this.notificacionesService.activarDesactivarLoader('desactivar');
      this.notificacionesService.lanzarNotificacion('Usuario o cotraseña incorrectos', 'Error', 'error');
    })
  }

}
