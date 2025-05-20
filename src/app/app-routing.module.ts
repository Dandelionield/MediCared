import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth/auth.guard';

const routes: Routes = [

	{

		path: 'login',
		loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)

	}, {

		path: '',
		redirectTo: 'login',
		pathMatch: 'full'

	}, {

		path: 'home',
		loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)

	}, {

		path: 'logup',
		loadChildren: () => import('./pages/auth/logup/logup.module').then( m => m.LogupPageModule)

	}, {

		path: 'my-appointments',
		loadChildren: () => import('./pages/appointment/appointments-pacient/appointments-pacient.module').then( m => m.AppointmentsPacientPageModule)

	},

];

@NgModule({

	imports: [

		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })

	], exports: [RouterModule]

}) export class AppRoutingModule {}
