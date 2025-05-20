import { Injectable } from '@angular/core';
import { IStatement } from '@interfaces/statement/statement.interface';
import { IUserQuery } from './interfaces/user.query.interface';
import { User } from '@core/services/user/entity/user.entity';
import { environment } from '@environment/environment';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { FirebaseError } from '@angular/fire/app';

import { Firestore, collection, collectionData, CollectionReference, deleteDoc, updateDoc, docData, doc, setDoc, getDoc, getDocs, query, where, limit } from '@angular/fire/firestore';

@Injectable({

	providedIn: 'root'

}) export class UserService implements IUserQuery<User>, IStatement<User>{

	private readonly collectionName: string = environment.firebase.collections.user.name;
	private readonly collectionIDField: string = environment.firebase.collections.user.idField;

	public constructor(private firestore: Firestore) {}

	public findOne(key: User['id']): Promise<User | undefined> {

		try{

			return getDoc(doc(

				collection(this.firestore, this.collectionName),
				key

			)).then((snapshot) => snapshot.data()) as Promise<User | undefined>;

		}catch(e: any){

			throw new FirebaseError('Error', e.message);
			return undefined as unknown as Promise<undefined>;

		}

	}

	public findAll(): Observable<Array<User>> {

		try{

			return collectionData(collection(this.firestore, this.collectionName), {

				idField: this.collectionIDField as keyof User

			}) as Observable<Array<User>>;

		}catch(e: any){

			throw new FirebaseError('Error', e.message);

		}

	}
 
	public async insert(entity: User): Promise<string | undefined> {

		try{

			await setDoc(doc(this.firestore, `${this.collectionName}/${entity.id as string}`), entity);

			return entity.id as string;

		}catch(e: any){

			throw new FirebaseError('Error', e.message);
			return undefined;

		}

	}

	public async update(key: User['id'], entity: Partial<User>): Promise<boolean> {

		try{

			await updateDoc(doc(this.firestore, `${this.collectionName}/${key}`), entity);

			return true;

		}catch (e: any){

			throw new FirebaseError('Error', e.message);
			return false;

		}

	}

	public async delete(key: User['id']): Promise<boolean> {

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

	public async exist(dni: User['dni']): Promise<boolean> {

		try {

			const q = query(

				collection(this.firestore, this.collectionName) as CollectionReference<User>,
				where('dni', '==', dni),
				limit(1)

			);
			
			const querySnapshot = await getDocs(q);
			return !querySnapshot.empty;

		}catch (e: any){

			throw new FirebaseError('Firestore Error', e.message);

		}

	}

}