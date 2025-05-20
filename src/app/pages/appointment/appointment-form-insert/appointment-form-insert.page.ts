import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingService } from '@shared/services/loading/loading.service';
import { SwalService } from '@shared/services/swal/swal.service';
import { AuthService } from '@core/services/auth/auth.service';
import { AppointmentService } from '@core/services/appointment/appointment.service';
import { Appointment, appointedType, appointmentTypes } from '@core/services/appointment/entity/appointment.entity';
import { User } from '@core/services/user/entity/user.entity';
import { Timestamp } from '@angular/fire/firestore';

@Component({

	selector: 'app-appointment-form-insert',
	templateUrl: './appointment-form-insert.page.html',
	styleUrls: ['./appointment-form-insert.page.scss'],
	standalone: false

}) export class AppointmentFormInsertPage implements OnInit {

	private user_id!: User['id'];
	public appointmentTypes: Array<string> = appointmentTypes;
	public minDate = new Date().toISOString();

	public insertForm = this.fb.group({

		appointed: [0, [Validators.required, Validators.min(0), Validators.max(4)]],
		begins: ['', Validators.required]

	});

	public constructor(

		private fb: FormBuilder,
		private swalService: SwalService,
		private loadingService: LoadingService,
		private appointmentService: AppointmentService,
		private authService: AuthService,
		private router: Router,

	) {

		const user: User | undefined = this.authService.getCurrentUser();

		if (user) this.user_id = user.id;

	}

	public ngOnInit(): void {}

	public async onSubmit(): Promise<void> {

		this.loadingService.show('Agendando');

		try{

			if (this.insertForm.invalid) {

				this.insertForm.markAllAsTouched();
				throw new Error('Invalid Paramethers');

			}

			const appointed = this.insertForm.get('appointed')?.value;
			const begins = this.insertForm.get('begins')?.value

			if (!appointed || !begins) {

				throw new Error('Invalid Paramethers');

			}

			const appoint: Appointment = {

				appointed: appointed as appointedType,
				begins: Timestamp.fromDate(new Date(begins)),
				pacient: this.user_id,
				state: true

			};

			let id: string | undefined = await this.appointmentService.insert(appoint);

			if (id){

				this.router.navigate(['/my-appointments']);

			}else{

				this.swalService.showException('Error', 'Unable to update');

			}

		}catch(e: any){

			this.swalService.showException('Error', e.message);

		}finally{

			this.loadingService.hide();

		}

	}

}