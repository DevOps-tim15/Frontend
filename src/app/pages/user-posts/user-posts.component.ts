import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { updateCall } from 'typescript';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {

  posts:any[] = []

  constructor(private fb: FormBuilder, private postService: PostService, private authService: AuthService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getAllPostsByUser();
  }

  getAllPostsByUser(){
    if (this.authService.isLoggedIn() == false) {
      return null;
    } 
    this.postService.getAllPostsByUser().subscribe(
      posts => {
        this.posts = posts;
        console.log(posts)
      },
      error => {
        this.toastr.error(error.error);
      }
    )
  }

  like(postId) {
    this.postService.like(postId).subscribe(
      post => {
        var foundIndex = this.posts.findIndex(x => x.postId == postId);
        this.posts[foundIndex] = post
        console.log(this.posts);
      },
      error => {
        this.toastr.error(error.error);
      }
    )
  }

  dislike(postId) {
    this.postService.dislike(postId).subscribe(
      post => {
        var foundIndex = this.posts.findIndex(x => x.postId == postId);
        this.posts[foundIndex] = post
        console.log(this.posts);
      },
      error => {
        this.toastr.error(error.error);
      }
    )
  }
}
