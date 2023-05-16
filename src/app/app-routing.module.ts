import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router'; 
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_services/auth.guard';
import { ProjectComponent } from './project/project.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'project', component: ProjectComponent , canActivate: [AuthGuard]},
  { path: 'dashboard', component: RegisterComponent , canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
