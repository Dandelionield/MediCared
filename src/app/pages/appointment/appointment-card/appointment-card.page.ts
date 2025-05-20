import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingService } from '@shared/services/loading/loading.service';
import { SwalService } from '@shared/services/swal/swal.service';
import { AppointmentService } from '@core/services/appointment/appointment.service';
import { Appointment, appointmentTypes } from '@core/services/appointment/entity/appointment.entity';
import { UserService } from '@core/services/user/user.service';
import { User } from '@core/services/user/entity/user.entity';
import { Timestamp } from '@angular/fire/firestore';
import { SweetAlertResult } from 'sweetalert2';

@Component({

	selector: 'app-appointment-card',
	templateUrl: './appointment-card.page.html',
	styleUrls: ['./appointment-card.page.scss'],
	standalone: false

}) export class AppointmentCardPage implements OnInit {

	public appointmentTypes: Array<string> = appointmentTypes;
	public appointment!: Appointment;
	public user!: User;

	public constructor(

		private fb: FormBuilder,
		private swalService: SwalService,
		private loadingService: LoadingService,
		private appointmentService: AppointmentService,
		private userService: UserService,
		private router: Router,
		private activeRouter: ActivatedRoute

	) {}

	public ngOnInit(): void {

		this.loadingService.show('Cargando');
		this.loadAppointment();

	}

	public formatDate(timestamp: Timestamp): string {

		if (!timestamp?.seconds) return 'Fecha no disponible';
	
		const date = new Date(timestamp.seconds * 1000);
		const now = new Date();
		const diffTime = Math.abs(now.getTime() - date.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		
		const absoluteDate = new Intl.DateTimeFormat('es-ES', {

			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'

		}).format(date);

		if (diffDays === 0) {

			return `Hoy a las ${absoluteDate.split(',')[1].trim()}`;

		}else if (diffDays === 1){

			return `Mañana a las ${absoluteDate.split(',')[1].trim()}`;

		}else if (diffDays < 7){

			return new Intl.DateTimeFormat('es-ES', { weekday: 'long' }).format(date).replace(/^\w/, c => c.toUpperCase()) + ` a las ${absoluteDate.split(',')[1].trim()}`;

		}
		
		return absoluteDate;

	}

	public calculateAge(birthdate: Timestamp): string {
		if (!birthdate?.seconds) return 'N/A';
		
		const birthDate = birthdate.toDate();
		const today = new Date();
		
		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDiff = today.getMonth() - birthDate.getMonth();
		
		if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		
		return age.toString();
	}

	public getAppointmentType(type: number): string {

		return appointmentTypes[type] || 'Tipo desconocido';

	}

	public formatBirthDate(timestamp: Timestamp): string {

		const date = timestamp?.toDate();

		return date?.toLocaleDateString('es-ES', {

			day: '2-digit',
			month: 'long',
			year: 'numeric'

		}) || 'Fecha no disponible';

	}

	public async updateAppointmentState(): Promise<void> {

		this.loadingService.show('Actualizando estado');

		try {

			await this.appointmentService.update(this.appointment.id, { 

				state: this.appointment.state 

			});

		} catch (e: any) {

			this.appointment.state = !this.appointment.state;
			this.swalService.showException('Error', e.message);

		} finally {

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

				await this.loadUser();

			}

		}catch(e: any){

			await this.swalService.showException('Error', e.message);
			this.router.navigate(['/appointments']);

		}

	}

	private async loadUser(): Promise<void> {

		try{

			const user: User | undefined = await this.userService.findOne(this.appointment.pacient);

			if (user){

				this.user = user;

			}

		}catch(e: any){

			await this.swalService.showException('Error', e.message);
			this.router.navigate(['/appointments']);

		}finally{

			this.loadingService.hide();

		}

	}

}