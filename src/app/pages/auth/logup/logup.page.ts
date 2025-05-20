import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { UserService } from '@core/services/user/user.service';
import { LoadingService } from '@shared/services/loading/loading.service';
import { SwalService } from '@shared/services/swal/swal.service';
import { User } from '@core/services/user/entity/user.entity';
import { Credential } from '@models/credential.model';
import { Timestamp } from '@angular/fire/firestore';

@Component({

	selector: 'app-logup',
	templateUrl: './logup.page.html',
	styleUrls: ['./logup.page.scss'],
	standalone: false

}) export class LogupPage implements OnInit {

	public loginForm = this.fb.group({

		dni: ['', [Validators.required], [Validators.minLength(7)], [Validators. maxLength(10)]],
		name: ['', [Validators.required]],
		surname: ['', [Validators.required]],
		birthDate: ['', [Validators.required]],
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required]]

	});

	public constructor(

		private fb: FormBuilder,
		private authService: AuthService,
		private userService: UserService,
		private loadingService: LoadingService,
		private swalService: SwalService,
		private router: Router

	) {}

	public ngOnInit(): void {}

	public async onSubmit(): Promise<void> {

		this.loadingService.show('Conectando');

		try{

			if (this.loginForm.invalid) {

				this.loginForm.markAllAsTouched();
				throw new Error('Invalid Paramethers');

			}

			const dni = this.loginForm.get('dni')?.value;
			const name = this.loginForm.get('name')?.value;
			const surname = this.loginForm.get('surname')?.value;
			const birthDate = this.loginForm.get('birthDate')?.value;
			const email = this.loginForm.get('email')?.value;
			const password = this.loginForm.get('password')?.value;

			if (!email || !password || !dni || !name || !surname || !birthDate) {

				throw new Error('Invalid Paramethers');

			}

			if (await this.userService.exist(dni)){

				throw new Error(`Usuario con documento ${dni} ya existe.`);

			}

			const user: User = {

				dni: dni,
				name: name,
				surname: surname,
				admin: false,
				birthdate: Timestamp.fromDate(new Date(birthDate))

			};

			const cred: Credential = {

				email: email,
				password: password

			};

			let UToken: string | undefined = await this.authService.logup(cred, user);

			if (UToken){

				this.router.navigate(['/home']);

			}else{

				this.swalService.showException('Error', 'Unable to access');

			}

		}catch(e: any){

			this.swalService.showException('Error', e.message);

		}finally{

			this.loadingService.hide();

		}

	}

}