import {API_URL_SIGNIN} from '../config.js'
import Localstore from './localstore.js'


export default class Auth {
	constructor() {
		
	}
	
	static attempt({email=null, password=null}) {
		var ajaxObj =  axios.post(API_URL_SIGNIN, {
					email: email,
					password: password,
				})

		ajaxObj.then(function (response) {
			Auth.login(response.data.token)
		}).catch(function (error) {
			console.log(error);
		});

		return ajaxObj;
	}

	static login(token=null) {
		if(!token) return "Cannot Login";
		localStorage.setItem('token', token);
	}

	static logout() {
		localStorage.removeItem('token');
		Localstore.clear()
	}

	static check() {
		return this.getToken() ? true : false;
	}

	static getToken() {
		return localStorage.getItem('token');
	}

	static getTokenDecoded() {
		return jwt_decode(Auth.getToken());
	}

	static getOrgID() {
		const data = Auth.getTokenDecoded();
		return data.org_id;
	}

	static getUserID() {
		const data = Auth.getTokenDecoded();
		return data.sub;
	}

	// Header which i will add to ajax request
	static header() {
		return {'Authorization' : 'Bearer ' + Auth.getToken()}
	}

}