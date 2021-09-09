import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: 'app-nistagram',
  templateUrl: './nistagram.component.html',
  styleUrls: ['./nistagram.component.scss']
})
export class NistagramComponent implements OnInit {

  posts:any[] = []
  disabled = true;

  constructor(private fb: FormBuilder, private postService: PostService, private toastr: ToastrService, private router: Router, 
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    if (this.isLoggedIn()) {
      this.disabled = false;
      this.postService.getAllPostsToView().subscribe(
        posts => {
          this.posts = posts;
          console.log(posts);
        },
        error => {
          this.toastr.error(error.error);
        }
      )
    } else {
      this.disabled = true;
      this.postService.getAllPostsFromPublicUsers().subscribe(
        posts => {
          this.posts = posts;
          console.log(posts);
        },
        error => {
          this.toastr.error(error.error);
        }
      )
    }
    
  }

  isLoggedIn() {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    else {
      return false;
    }
  }

}
