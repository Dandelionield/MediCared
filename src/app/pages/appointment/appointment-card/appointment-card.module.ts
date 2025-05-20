import { NgModule } from '@angular/core';
import { AppointmentCardPageRoutingModule } from './appointment-card-routing.module';
import { AppointmentCardPage } from './appointment-card.page';

import { SharedModule } from '@shared/shared.module';

@NgModule({

	imports: [

		SharedModule,
		AppointmentCardPageRoutingModule

	], declarations: [AppointmentCardPage]

}) export class AppointmentCardPageModule {}