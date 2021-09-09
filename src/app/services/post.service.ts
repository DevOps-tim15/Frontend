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
		'Access-Control-Allow-Credentials': 'true'
	});
	private baseUrl = "http://localhost:8080/api/post/";

	constructor(private http: HttpClient) { }

	uploadPost(post: any): Observable<any> {
		let postUrl = this.baseUrl + "create";
		return this.http.post(postUrl, post, { headers: this.headers });
	}

	getAllUsersForTagging(): Observable<any> {
		let postUrl = this.baseUrl + "forTagging";
		return this.http.get(postUrl, { headers: this.headers }); 
	}

	getAllPostsByUser():  Observable<any> {
		let postUrl = this.baseUrl + "userPosts";
		return this.http.get(postUrl, { headers: this.headers }); 
	}

	getAllPostsFromPublicUsers(): Observable<any> {
		let postUrl = this.baseUrl + "publicUsers";
		return this.http.get(postUrl, { headers: this.headers }); 
	}

	getAllPostsToView(): Observable<any> {
		let postUrl = this.baseUrl + "postsToView";
		return this.http.get(postUrl, { headers: this.headers }); 
	}
}
