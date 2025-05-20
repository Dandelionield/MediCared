import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentFormUpdatePage } from './appointment-form-update.page';

const routes: Routes = [
  {
    path: '',
    component: AppointmentFormUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentFormUpdatePageRoutingModule {}
