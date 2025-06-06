import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { firebaseConfig } from './config/env.config';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { UserService } from './services/user/user.service';
import { AppointmentService } from './services/appointment/appointment.service';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './guards/auth/auth.guard';

@NgModule({

	declarations: [

		

	], imports: [

		HttpClientModule

	], exports: [

		

	], providers: [

		UserService,
		AppointmentService,
		AuthService,
		AuthGuard,
		provideFirebaseApp(

			() => initializeApp(firebaseConfig)

		), provideFirestore(

			() => getFirestore()

		), provideAuth(

			() => getAuth()

		)

	]

}) export class CoreModule {

	public constructor(@Optional() @SkipSelf() parentModule?: CoreModule){

		if (parentModule){

			throw new Error('CoreModule already rendered. Import it only at AppModule');

		}

	}

}