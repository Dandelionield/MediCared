import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentsPacientPage } from './appointments-pacient.page';

const routes: Routes = [
  {
    path: '',
    component: AppointmentsPacientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentsPacientPageRoutingModule {}
