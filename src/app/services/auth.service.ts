import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
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
		let logoutUrl = this.baseUrl + "signout";
		return this.http.post(logoutUrl, null, {headers: this.headers, responseType: 'text'});
	}

	isLoggedIn(): boolean {
		if (localStorage.getItem('user')) {
				return true;
		}
		return false;
	}

	getRole(): string {
		const token = localStorage.getItem('user');
		const jwt: JwtHelperService = new JwtHelperService();

		if (!token) {
			return "";
		}

		const info = jwt.decodeToken(token);
		return info.role;
	}

	register(user: any): Observable<any> {
		let registrationUrl =  this.baseUrl + "registration";
		return this.http.post(registrationUrl, user, {headers: this.headers, responseType: 'json'});
	}

	update(user: any): Observable<any> {
		let registrationUrl =  this.baseUrl + "update";
		return this.http.put(registrationUrl, user, {headers: this.headers, responseType: 'text'});
	}

	confirmRegistration(token: string): Observable<any> {
		let confirmationUrl = this.baseUrl+ "confirm/" + token;
		return this.http.post(confirmationUrl, {headers: this.headers, responseType: 'json'});
	}

	getLoggedIn(): Observable<any> {
		let editUrl = this.baseUrl + "getLoggedIn";
		return this.http.post(editUrl, null, {headers: this.headers, responseType: 'json'});
	}
}