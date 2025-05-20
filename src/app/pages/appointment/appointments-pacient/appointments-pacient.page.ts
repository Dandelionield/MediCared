import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '@shared/services/loading/loading.service';
import { SwalService } from '@shared/services/swal/swal.service';
import { AuthService } from '@core/services/auth/auth.service';
import { AppointmentService } from '@core/services/appointment/appointment.service';
import { Appointment } from '@core/services/appointment/entity/appointment.entity';
import { User } from '@core/services/user/entity/user.entity';

@Component({

	selector: 'app-appointments-pacient',
	templateUrl: './appointments-pacient.page.html',
	styleUrls: ['./appointments-pacient.page.scss'],
	standalone: false

}) export class AppointmentsPacientPage implements OnInit {

	private user_id!: User['id'];
	public appointments: Array<Appointment> = [];

	public constructor(

		private swalService: SwalService,
		private loadingService: LoadingService,
		private router: Router,
		private authService: AuthService,
		private appointmentService: AppointmentService

	) {

		const user: User | undefined = this.authService.getCurrentUser();

		if (user) this.user_id = user.id;

	}

	public ngOnInit(): void {

		this.loadingService.show('Cargando');

		this.loadAppointments();

	}

	private loadAppointments(): void {

		this.appointmentService.findAllByUser(this.user_id).subscribe({

			next: (t) => {

				this.appointments = t;

				this.loadingService.hide();

			}, error: (e) => {

				this.swalService.showException('Error', e.message);
				this.loadingService.hide();

			}

		});

	}

}