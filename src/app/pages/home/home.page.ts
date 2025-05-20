import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '@shared/services/loading/loading.service';
import { SwalService } from '@shared/services/swal/swal.service';
import { AuthService } from '@core/services/auth/auth.service';
import { User } from '@core/services/user/entity/user.entity';

@Component({

	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
	standalone: false,

}) export class HomePage implements OnInit{

	public loggedUser$ = this.authService.loggedUser$;

	public constructor(

		private swalService: SwalService,
		private loadingService: LoadingService,
		private router: Router,
		private authService: AuthService

	) {}

	public ngOnInit(): void {}

}