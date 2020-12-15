import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboarRoutes } from './dashboard/dashboard.routes';
import { AuthGuard } from './services/guards/auth.guard';

const ROUTES: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '', component: DashboardComponent, children: dashboarRoutes, canActivate: [AuthGuard]},
    {path: '**', redirectTo: ''},
]

@NgModule({
imports :[
    RouterModule.forRoot(ROUTES)
],
exports : [ RouterModule ]
})

export class AppRoutingModule{}

