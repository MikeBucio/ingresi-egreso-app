import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificacionesService } from '../../services/notificaciones-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  formRegistro: FormGroup;

  constructor( private fb: FormBuilder, private authService: AuthService, 
               private router: Router, private notificacionesService: NotificacionesService ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario(){
    this.formRegistro = this.fb.group({
      nombreUsuario: ['', [Validators.required, Validators.minLength(6)]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  crearUsuario(){
    this.authService.crearUsuario(this.formRegistro.value).then(credenciales => {
      console.log(credenciales)
      this.router.navigateByUrl('/')
    }).catch( err => this.notificacionesService.lanzarNotificacion('No se pudo registrar el usuario', 'Error', 'error'))
  }

}
