import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	private headers = new HttpHeaders({'Access-Control-Allow-Origin': '*',
										'Access-Control-Allow-Credentials': 'true'});
  private baseUrl = "http://localhost:8080/api/auth/";
	constructor(
		private http: HttpClient
	) { }

	login(auth: any): Observable<any> {
		let loginUrl =  this.baseUrl+ "login";
		return this.http.post(loginUrl, {username: auth.username, password: auth.password}, {headers: this.headers, responseType: 'text'});
	}

	logout(): Observable<any> {
		let logoutUrl = this.baseUrl + "logout";
		return this.http.get(logoutUrl, {headers: this.headers, responseType: 'text'});
	}

	isLoggedIn(): boolean {
		if (localStorage.getItem('user')) {
				return true;
		}
		return false;
	}

	register(user: any): Observable<any> {
		let registrationUrl =  this.baseUrl + "registration";
		return this.http.post(registrationUrl, user, {headers: this.headers, responseType: 'json'});
	}

	confirmRegistration(token: string): Observable<any> {
		let confirmationUrl = this.baseUrl+ "confirm/" + token;
		return this.http.post(confirmationUrl, {headers: this.headers, responseType: 'json'});
	}
}