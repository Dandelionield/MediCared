import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { User } from '@core/services/user/entity/user.entity';

@Component({

	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	standalone: false

}) export class HeaderComponent implements OnInit, OnDestroy {

	@Input() public title: string = 'Page';
	@Input() public showBackButton: boolean = false;
	@Input() public lastPage: string | undefined = undefined;
	public user!: User | undefined;
	public isExpanded = false;

	public loggedUser$ = this.authService.loggedUser$;

	public constructor(

		private authService: AuthService,
		private router: Router,
		private location: Location

	) {}

	public ngOnInit(): void {

		this.loggedUser$.subscribe({

			next: (t) => {

				this.user = t;

			}, error: (e) => {console.log(e);}

		});

	}

	public ngOnDestroy(): void {}

	public async logout(): Promise<void> {

		await this.authService.logout();
		this.router.navigate(['/']);

	}

	public goBack(): void{

		if (!this.lastPage){

			this.location.back();

		}else{

			this.router.navigate([this.lastPage]);

		}

	}

}