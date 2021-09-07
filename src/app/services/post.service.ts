import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Credentials': 'true'});
  private baseUrl = "http://localhost:8080/api/post/";
  
  constructor(private http: HttpClient) { }

  uploadPost(post: any): Observable<any> {
		let postUrl =  this.baseUrl+ "create";
		return this.http.post(postUrl, post, {headers: this.headers});
	}
}
