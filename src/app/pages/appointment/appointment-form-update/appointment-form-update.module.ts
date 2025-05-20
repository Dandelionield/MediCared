import { NgModule } from '@angular/core';
import { AppointmentFormUpdatePageRoutingModule } from './appointment-form-update-routing.module';
import { AppointmentFormUpdatePage } from './appointment-form-update.page';

import { SharedModule } from '@shared/shared.module';

@NgModule({

	imports: [

		SharedModule,
		AppointmentFormUpdatePageRoutingModule

	], declarations: [AppointmentFormUpdatePage]

}) export class AppointmentFormUpdatePageModule {}