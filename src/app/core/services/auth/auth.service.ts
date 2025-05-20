import { Injectable, inject } from '@angular/core';
import { IAuth } from './interfaces/auth.interface';
import {

	Auth,
	UserCredential,
	User as AuthUser,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	authState,
	onAuthStateChanged,
	browserSessionPersistence,
	setPersistence

} from '@angular/fire/auth';
import { FirebaseError } from '@angular/fire/app';
import { UserService } from '@core/services/user/user.service';
import { User } from '@core/services/user/entity/user.entity';
import { Credential } from '@models/credential.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({

	providedIn: 'root'

}) export class AuthService implements IAuth<Credential, User>{

	private _loggedUser: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
	public loggedUser$: Observable<User | undefined> = this._loggedUser.asObservable();
	public authState$: Observable<AuthUser | null>;

	public constructor(

		private auth: Auth,
		private userService: UserService

	){

		this.authState$ = authState(this.auth);

		onAuthStateChanged(this.auth, async (user) => {

			if (user) {

				let u: User | undefined = await this.userService.findOne(user.uid);
				this._loggedUser.next(u);

			}

		});

	}

	public getCurrentUser(): User | undefined{

		//return this.auth.currentUser?.uid || null;

		return this._loggedUser.value;

	}

	public isLoggedIn(): boolean {

		return !!this.auth.currentUser;

	}

	public async login(cred: Credential): Promise<string | undefined> {

		try {

			await setPersistence(this.auth, browserSessionPersistence);
			const userCredential: UserCredential = await signInWithEmailAndPassword(this.auth, cred.email, cred.password);
			
			if (userCredential.user) {

				let UToken: string = await userCredential.user.getIdToken();

				let user: User | undefined = await this.userService.findOne(userCredential.user.uid);

				this._loggedUser.next(user);

				return UToken;

			}else{

				throw new FirebaseError('ERROR', 'Wrong credentials.');
				return undefined;

			}

		}catch (e: any){

			if (e instanceof FirebaseError){

				throw e;

			}else{

				throw new Error(e.message);

			}

			return undefined;

		}

	}

	public async logup(cred: Credential, user: User): Promise<string | undefined> {

		try {

			const userCredential = await createUserWithEmailAndPassword(this.auth, cred.email, cred.password);

			if (userCredential.user) {

				let UToken: string = await userCredential.user.getIdToken();

				user.id = userCredential.user.uid;

				let id: string | undefined = await this.userService.insert(user);

				this._loggedUser.next(user);

				return UToken;

			}else{

				throw new FirebaseError('404', 'Wrong paramethers.');
				return undefined;

			}

		}catch (e: any){

			if (e instanceof FirebaseError){

				throw e;

			}else{

				throw new Error(e.message);

			}

			return undefined;

		}

	}

	public async logout(): Promise<void> {

		this._loggedUser.next(undefined);
		await signOut(this.auth);

	}

}