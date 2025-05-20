import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment, appointmentTypes } from '@core/services/appointment/entity/appointment.entity';
import { User } from '@core/services/user/entity/user.entity';
import { Timestamp } from '@angular/fire/firestore';

@Component({

	selector: 'app-appointment-row',
	templateUrl: './appointment-row.component.html',
	styleUrls: ['./appointment-row.component.scss'],
	standalone: false

}) export class AppointmentRowComponent	implements OnInit {

	@Input({

		required: true

	}) public appointment!: Appointment;

	@Input() public user: User | undefined = undefined;

	public constructor(private router: Router) {}

	public ngOnInit(): void {}

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

	public getAppointmentType(type: number): string {

		return appointmentTypes[type] || 'Tipo desconocido';

	}

	public navigateToUpdate(): void {

		this.router.navigate(['/update-appointment', this.appointment.id]);

	}

}