export const environment = {

	production: false,
	firebase: {

		credentials: {

			apiKey: "AIzaSyDcsl611ZG-95vkwv0T-q9zUE9JzsfrUo4",
			authDomain: "medicared-software.firebaseapp.com",
			projectId: "medicared-software",
			storageBucket: "medicared-software.firebasestorage.app",
			messagingSenderId: "487282611603",
			appId: "1:487282611603:web:bde0d6306e3d6085540466"

		}, collections: {

			user: {

				name: 'user',
				idField: 'id'

			}, appointment: {

				name: 'appointment',
				idField: 'id'

			}

		}

	}

};