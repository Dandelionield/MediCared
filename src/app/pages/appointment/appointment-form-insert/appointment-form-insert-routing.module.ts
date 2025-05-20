import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentFormInsertPage } from './appointment-form-insert.page';

const routes: Routes = [
  {
    path: '',
    component: AppointmentFormInsertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentFormInsertPageRoutingModule {}
