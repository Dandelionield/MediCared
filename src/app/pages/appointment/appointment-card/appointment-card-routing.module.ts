import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentCardPage } from './appointment-card.page';

const routes: Routes = [
  {
    path: '',
    component: AppointmentCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentCardPageRoutingModule {}
