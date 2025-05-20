import { NgModule } from '@angular/core';
import { AppointmentListPageRoutingModule } from './appointment-list-routing.module';
import { AppointmentListPage } from './appointment-list.page';

import { SharedModule } from '@shared/shared.module';

@NgModule({

	imports: [

		SharedModule,
		AppointmentListPageRoutingModule

	], declarations: [AppointmentListPage]

}) export class AppointmentListPageModule {}