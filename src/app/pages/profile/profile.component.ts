import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  @Input() user: any;
  userService: UserService;
  toastr: ToastrService;
  router: Router;
  authService: AuthService;
  constructor(userService: UserService, toastr: ToastrService, router: Router, authService: AuthService) {
    this.userService = userService;
    this.toastr = toastr;
    this.router = router;
    this.authService = authService;
  }

 
  ngOnInit(): void {
    console.log(this.user);
  }

  isLoggedIn(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    else {
      return false;
    }
  }

  block() : void{
    console.log(this.user.username);
    this.userService.blockUser(this.user.username).subscribe(
      message => {
        this.toastr.success("User successfully blocked!");
        window.location.href="http://localhost:4200/#/nistagram"
      },
      error => {
        console.log(error);
        this.toastr.error(error.error);
      }
    )
  }

  
  mute() : void{
    console.log(this.user.username);
    this.userService.muteUser(this.user.username).subscribe(
      message => {
        this.toastr.success("User successfully muted!");
        window.location.href="http://localhost:4200/#/nistagram"
      },
      error => {
        console.log(error);
        this.toastr.error(error.error);
      }
    )
  }

  unmute() : void{
    console.log(this.user.username);
    this.userService.unmuteUser(this.user.username).subscribe(
      message => {
        this.toastr.success("User successfully unmuted!");
        window.location.href="http://localhost:4200/#/nistagram"
      },
      error => {
        console.log(error);
        this.toastr.error(error.error);
      }
    )
  }

  follow() {
    this.userService.follow(this.user.username).subscribe(
      followed => {
        if (followed) {
          this.user.isFollowing = true;
          this.toastr.success('Successfully followed!');
        } else {
          this.user.isRequested = true;
          this.toastr.success('Successfully requested!');
        }
      },
      error => {
        this.toastr.error(error.error);
      }
    )
  }

  unfollow() {
    this.userService.unfollow(this.user.username).subscribe(
      followed => {
        if (followed) {
          this.user.isFollowing = false;
          this.toastr.success('Successfully unfollowed!');
        }
      },
      error => {
        this.toastr.error(error.error);
      }
    )
  }

  removeRequest() {
    this.userService.removeRequest(this.user.username).subscribe(
      followed => {
        if (followed) {
          this.user.isRequested = false;
          this.toastr.success('Successfully removed request!');
        }
      },
      error => {
        this.toastr.error(error.error);
      }
    )
  }

}
