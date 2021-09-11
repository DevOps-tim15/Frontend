import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from "src/app/services/auth.service";
import { Location } from "@angular/common";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nistagram',
  templateUrl: './nistagram.component.html',
  styleUrls: ['./nistagram.component.scss']
})
export class NistagramComponent implements OnInit {

  posts:any[] = []
  disabled = true;
  admin = false;
  uploadForm = this.fb.group({
    comment: [''],
  }); 
  closeModal: string;
  comments:any[] = [];

  constructor(private fb: FormBuilder, private postService: PostService, private toastr: ToastrService, private router: Router, 
    private authService: AuthService, private location: Location, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getPath();
  }

  getPosts(title: string) {
    switch (title) {
      case "/nistagram":
        if (this.isLoggedIn() && !this.isAdmin()) {
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
            case "/reported-posts":
            if (this.isLoggedIn()) {
              this.disabled = false;
              this.admin = true;
              this.postService.reportedPosts().subscribe(
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

  isAdmin() {
    return this.authService.getRole() === "ROLE_ADMIN";
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

  report(postId) {
    this.postService.report(postId).subscribe(
      post => {
        var foundIndex = this.posts.findIndex(x => x.postId == postId);
        this.posts[foundIndex] = post
        this.toastr.success('Successfully reported!');
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

  commentPost(postId) {
    let comment = {
      postId: postId,
      text: this.uploadForm.get('comment').value
    }
    this.postService.uploadComment(comment).subscribe(
      post => {
        var foundIndex = this.posts.findIndex(x => x.postId == postId);
        this.posts[foundIndex] = post
        this.toastr.success('Successfully commented!');
      },
      error => {
        this.toastr.error(error.error);
      }
    )
  }

  allComments(content, postId) {
    var foundIndex = this.posts.findIndex(x => x.postId == postId);
    this.comments = this.posts[foundIndex].comments
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeModal = `Closed with: ${result}`;
    }, (reason) => {
      this.closeModal = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
