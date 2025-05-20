import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { User } from '@core/services/user/entity/user.entity';
import { AuthService } from '@core/services/auth/auth.service';
import { take, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
	
	providedIn: 'root'

}) export class AuthGuard implements CanActivate{

	public constructor(private authService: AuthService, private router: Router) {}

	public canActivate(): Observable<boolean> {

		return this.authService.authState$.pipe(take(1),

			switchMap(async (AuthUser) => {

				if (!AuthUser) {

					this.authService.logout();

					return false;

				}

				const user: User | undefined = this.authService.getCurrentUser();

				if (!user) return false;

				return user.admin;

			})

		);

	}

}