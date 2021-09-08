import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {

  posts:any[] = []

  constructor(private fb: FormBuilder, private postService: PostService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getAllPostsByUser();
  }

  getAllPostsByUser(){
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

}
