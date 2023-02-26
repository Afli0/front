import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { UserComponent } from './main/user/user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'utilisateur',
    pathMatch: 'full',
  },
  {
    path:'utilisateur',
    component:  UserComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
