import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from "src/app/services/auth.service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-nistagram',
  templateUrl: './nistagram.component.html',
  styleUrls: ['./nistagram.component.scss']
})
export class NistagramComponent implements OnInit {

  posts:any[] = []
  disabled = true;

  constructor(private fb: FormBuilder, private postService: PostService, private toastr: ToastrService, private router: Router, 
    private authService: AuthService, private location: Location) { }

  ngOnInit(): void {
    this.getPath();
  }

  getPosts(title: string) {
    switch (title) {
      case "/nistagram":
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
          );
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
        break;
      case "/liked-disliked":
        if (this.isLoggedIn()) {
          this.disabled = false;
          this.postService.getAllLikedAndDisliked().subscribe(
            posts => {
              this.posts = posts;
              console.log(posts);
            },
            error => {
              this.toastr.error(error.error);
            }
          );
        } else {
          return null;
        } 
        break;
        case "/user-posts":
          if (this.isLoggedIn()) {
            this.disabled = false;
            this.postService.getAllPostsByUser().subscribe(
              posts => {
                this.posts = posts;
                console.log(posts);
              },
              error => {
                this.toastr.error(error.error);
              }
            );
          } else {
            return null;
          } 
          break;
          case "/saved-posts":
            if (this.isLoggedIn()) {
              this.disabled = false;
              this.postService.getAllSavedPosts().subscribe(
                posts => {
                  this.posts = posts;
                  console.log(posts);
                },
                error => {
                  this.toastr.error(error.error);
                }
              );
            } else {
              return null;
            } 
            break;    
      default:
        break;
      
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

  save(postId) {
    this.postService.save(postId).subscribe(
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

  getPath() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }
    this.getPosts(titlee);
    
  }

}
