import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '@shared/services/loading/loading.service';
import { SwalService } from '@shared/services/swal/swal.service';
import { AuthService } from '@core/services/auth/auth.service';
import { AppointmentService } from '@core/services/appointment/appointment.service';
import { Appointment, appointmentTypes } from '@core/services/appointment/entity/appointment.entity';
import { UserService } from '@core/services/user/user.service';
import { User } from '@core/services/user/entity/user.entity';
import { Timestamp } from '@angular/fire/firestore';
import { finalize } from 'rxjs/operators';

@Component({

	selector: 'app-appointment-list',
	templateUrl: './appointment-list.page.html',
	styleUrls: ['./appointment-list.page.scss'],
	standalone: false

}) export class AppointmentListPage implements OnInit {

	public appointments: Array<{ appointment: Appointment, pacient: User}> = [];
	public appointmentTypes: Array<string> = appointmentTypes;

	public constructor(

		private swalService: SwalService,
		private loadingService: LoadingService,
		private router: Router,
		private appointmentService: AppointmentService,
		private userService: UserService

	) {}

	public ngOnInit(): void {

		this.loadingService.show('Cargando');

		this.loadAppointments();

	}

	public navigateToCard(id: Appointment['id']): void {

		this.router.navigate(['/card', id]);

	}

	private loadAppointments(): void {

		this.appointmentService.findAll().pipe(

			finalize(() => this.loadingService.hide())

		).subscribe({

			next: (t) => {

				this.loadPacients(t);

			}, error: (e) => this.swalService.showException('Error', e.message)

		});

	}

	private async loadPacients(appoints: Array<Appointment>): Promise<void> {

		const promises = appoints.map(async (appoint) => {

			const user: User | undefined = await this.userService.findOne(appoint.pacient);
			return { appointment: appoint, pacient: user as User	};

		});

		this.appointments = await Promise.all(promises);

		this.loadingService.hide();

	}

}