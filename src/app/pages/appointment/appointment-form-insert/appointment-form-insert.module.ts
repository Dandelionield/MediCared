import { NgModule } from '@angular/core';
import { AppointmentFormInsertPageRoutingModule } from './appointment-form-insert-routing.module';
import { AppointmentFormInsertPage } from './appointment-form-insert.page';

import { SharedModule } from '@shared/shared.module';

@NgModule({

	imports: [

		SharedModule,
		AppointmentFormInsertPageRoutingModule

	], declarations: [AppointmentFormInsertPage]

}) export class AppointmentFormInsertPageModule {}