import { Injectable } from '@angular/core';
import { IStatement } from '@interfaces/statement/statement.interface';
import { IAppointmentQuery } from './interfaces/appointment.query.interface';
import { Appointment } from '@core/services/appointment/entity/appointment.entity';
import { User } from '@core/services/user/entity/user.entity';
import { environment } from '@environment/environment';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { FirebaseError } from '@angular/fire/app';

import { Firestore, collection, collectionData, CollectionReference, deleteDoc, updateDoc, docData, doc, addDoc, setDoc, getDoc, getDocs, query, where, orderBy, limit } from '@angular/fire/firestore';

@Injectable({

	providedIn: 'root'

}) export class AppointmentService implements IAppointmentQuery<Appointment>{

	private readonly collectionName: string = environment.firebase.collections.appointment.name;
	private readonly collectionIDField: string = environment.firebase.collections.appointment.idField;

	public constructor(private firestore: Firestore) {}

	public findOne(key: Appointment['id']): Promise<Appointment | undefined> {

		try{

			return getDoc(doc(

				collection(this.firestore, this.collectionName),
				key

			)).then((snapshot) => snapshot.data()) as Promise<Appointment | undefined>;

		}catch(e: any){

			throw new FirebaseError('Error', e.message);
			return undefined as unknown as Promise<undefined>;

		}

	}

	public findAll(): Observable<Array<Appointment>> {

		try{

			return collectionData(query(

				collection(this.firestore, this.collectionName) as CollectionReference<Appointment>,
				orderBy('begins', 'desc')

			), {

				idField: this.collectionIDField as keyof Appointment

			}) as Observable<Array<Appointment>>;

		}catch(e: any){

			throw new FirebaseError('Error', e.message);

		}

	}

	public findAllByUser(user_id: User['id']): Observable<Array<Appointment>>{

		console.log(user_id);

		try{

			return collectionData(query(

				collection(this.firestore, this.collectionName) as CollectionReference<Appointment>,
				where('pacient', '==', user_id),
				orderBy('begins', 'desc')

			), {

				idField: this.collectionIDField as keyof Appointment

			}) as Observable<Array<Appointment>>;

		}catch (e: any){

			throw new FirebaseError('Firestore Error', e.message);

		}

	}

	public async insert(entity: Appointment): Promise<string | undefined> {

		try{

			const doc = await addDoc(

				collection(this.firestore, this.collectionName),
				entity

			);

			return doc.id;

		}catch(e: any){

			throw new FirebaseError('Error', e.message);
			return undefined;

		}

	}

	public async update(key: Appointment['id'], entity: Partial<Appointment>): Promise<boolean> {

		try{

			await updateDoc(doc(this.firestore, `${this.collectionName}/${key}`), entity);

			return true;

		}catch (e: any){

			throw new FirebaseError('Error', e.message);
			return false;

		}

	}

	public async delete(key: Appointment['id']): Promise<boolean> {

		try{

			await deleteDoc(doc(

				this.firestore,
				`${this.collectionName}/${key}`

			));

			return true;

		}catch (e: any){

			throw new FirebaseError('Error', e.message);
			return false;

		}

	}

}