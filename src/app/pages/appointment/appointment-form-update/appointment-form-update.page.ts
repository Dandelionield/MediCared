import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingService } from '@shared/services/loading/loading.service';
import { SwalService } from '@shared/services/swal/swal.service';
import { AppointmentService } from '@core/services/appointment/appointment.service';
import { Appointment, appointedType, appointmentTypes } from '@core/services/appointment/entity/appointment.entity';
import { Timestamp } from '@angular/fire/firestore';
import { SweetAlertResult } from 'sweetalert2';

@Component({

	selector: 'app-appointment-form-update',
	templateUrl: './appointment-form-update.page.html',
	styleUrls: ['./appointment-form-update.page.scss'],
	standalone: false

}) export class AppointmentFormUpdatePage implements OnInit {

	public appointment!: Appointment;
	public appointmentTypes: Array<string> = appointmentTypes;
	public minDate = new Date().toISOString();

	public updateForm = this.fb.group({

		appointed: [0, [Validators.required, Validators.min(0), Validators.max(4)]],
		begins: ['', Validators.required],
		state: [true, Validators.required]

	});

	public constructor(

		private fb: FormBuilder,
		private swalService: SwalService,
		private loadingService: LoadingService,
		private appointmentService: AppointmentService,
		private router: Router,
		private activeRouter: ActivatedRoute

	) {}

	public ngOnInit(): void {

		this.loadingService.show('Cargando');
		this.loadAppointment();

	}

	public async onSubmit(): Promise<void> {

		const shot: SweetAlertResult = await this.swalService.getConfirmation('Confirmación', '¿Está seguro que quiere actualizar la cita?');

		if (shot.isConfirmed){

			this.update();

		}

	}

	private async update(): Promise<void> {

		this.loadingService.show('Actualizando');

		try{

			if (this.updateForm.invalid) {

				this.updateForm.markAllAsTouched();
				throw new Error('Invalid Paramethers');

			}

			const appointed = this.updateForm.get('appointed')?.value;
			const begins = this.updateForm.get('begins')?.value
			const state = this.updateForm.get('state')?.value;

			if (!appointed || !begins || state===null) {

				throw new Error('Invalid Paramethers');

			}

			const shot: boolean = state!==this.appointment.state ? (await this.swalService.getWarningConfirmation('Confirmación', '¿Está seguro que quiere cancelar la cita?')).isConfirmed : true;

			if (shot){

				const appoint: Partial<Appointment> = {

					appointed: appointed as appointedType,
					begins: Timestamp.fromDate(new Date(begins)),
					state: state

				};

				let success: boolean = await this.appointmentService.update(this.appointment.id, appoint);

				if (success){

					this.router.navigate(['/my-appointments']);

				}else{

					this.swalService.showException('Error', 'Unable to update');

				}

			}

		}catch(e: any){

			this.swalService.showException('Error', e.message);

		}finally{

			this.loadingService.hide();

		}

	}

	private async loadAppointment(): Promise<void> {

		try{

			const id: string = this.activeRouter.snapshot.paramMap.get('id') as string;

			const appoint: Appointment | undefined = await this.appointmentService.findOne(id);

			if (appoint){

				this.appointment = {

					id: id,
					...appoint

				};

				this.loadForm();

			}

		}catch(e: any){

			await this.swalService.showException('Error', e.message);
			this.router.navigate(['/my-appointments']);

		}finally{

			this.loadingService.hide();

		}

	}

	private loadForm(): void {

		if (!this.appointment.state) this.router.navigate(['/my-appointments']);

		const beginsDate = this.appointment.begins.toDate().toISOString();
		
		this.updateForm.patchValue({

			appointed: this.appointment.appointed,
			begins: beginsDate,
			state: this.appointment.state

		});

		this.loadingService.hide();

	}

}