import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Credentials': 'true'
	});
	private baseUrl = "http://localhost:8080/api/user/";

	constructor(private http: HttpClient) { }

	removeAccount(username: string): Observable<any> {
		let userUrl = this.baseUrl + "remove/" + username;
		return this.http.delete(userUrl, { headers: this.headers });
	}

	follow(username: string): Observable<any> {
		let userUrl = this.baseUrl + "follow/" + username;
		return this.http.get(userUrl, { headers: this.headers }) ;
	}

  blockUser(username: string): Observable<any> {
	let userUrl = this.baseUrl + "block/" + username;
	return this.http.post(userUrl, { headers: this.headers}); 	
	}

  muteUser(username: string): Observable<any> {
		let userUrl = this.baseUrl + "mute/" + username;
		return this.http.post(userUrl, { headers: this.headers}); 	
  }

  
  unmuteUser(username: string): Observable<any> {
	let userUrl = this.baseUrl + "unmute/" + username;
	return this.http.post(userUrl, { headers: this.headers}); 	
  }
}
