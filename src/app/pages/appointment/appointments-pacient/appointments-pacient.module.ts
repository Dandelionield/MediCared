import { NgModule } from '@angular/core';
import { AppointmentsPacientPageRoutingModule } from './appointments-pacient-routing.module';
import { AppointmentsPacientPage } from './appointments-pacient.page';

import { SharedModule } from '@shared/shared.module';

@NgModule({

	imports: [

		SharedModule,
		AppointmentsPacientPageRoutingModule

	], declarations: [AppointmentsPacientPage]

}) export class AppointmentsPacientPageModule {}