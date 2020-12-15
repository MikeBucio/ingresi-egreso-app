import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { NotificacionesService } from './services/notificaciones-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
      <ngx-spinner bdColor="rgba(0, 0, 0, 0.8)" size="medium" color="#fff" type="square-jelly-box" [fullScreen]="true">
        <p style="color: white"> Loading... </p>
      </ngx-spinner>
       <router-outlet></router-outlet>
   `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ingresoEgresoApp';
  subsLoader = new Subscription();

  constructor(private notificacionesService: NotificacionesService,   
              private spinnerService: NgxSpinnerService,
              private authService: AuthService ) {
                this.authService.initAuthListener();
  }

  ngOnInit(): void {
    this.subsLoader = this.notificacionesService.obtenerEstatusLoader().subscribe(estadoLoader => {
      console.log(estadoLoader);
      switch (estadoLoader) {
        case 'activar':
          this.spinnerService.show();
          break;
        case 'desactivar':
          this.spinnerService.hide();
        break;
      }
    });
  }
  ngOnDestroy(): void {
    this.subsLoader.unsubscribe();
  }
}
