import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-following-requests',
  templateUrl: './following-requests.component.html',
  styleUrls: ['./following-requests.component.scss']
})
export class FollowingRequestsComponent implements OnInit {
  requests: string[] = []
  constructor(private userService: UserService, private toastr: ToastrService, private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.userService.getAllRequests().subscribe(
      requests => {
        this.requests = requests;
        console.log(requests)
      },
      error => {
        this.toastr.error(error.error);
      }
    )
  }

  viewProfile(profileUsername){
    if(profileUsername !== null){
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
      }
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/profile', profileUsername]);
    }
  }

  accept(username): void {
    this.userService.acceptRequest(username).subscribe(
      requests => {
        this.requests = requests;
        this.toastr.success('Successfully accepted request!');
      },
      error => {
        this.toastr.error(error.error);
      }
    )
  }

  decline(username): void {
    this.userService.declineRequest(username).subscribe(
      requests => {
        this.requests = requests;
        this.toastr.success('Successfully declined request!');
      },
      error => {
        this.toastr.error(error.error);
      }
    )
  }

}
