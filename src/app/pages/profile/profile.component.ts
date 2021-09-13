import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  @Input() user: any;
  constructor(private userService: UserService, private toastr: ToastrService) {}

  ngOnInit(): void {
    
  }

  follow() {
    this.userService.follow(this.user.username).subscribe(
      followed => {
        if (followed) {
          this.user.isFollowing = true;
          this.toastr.success('Successfully followed!');
        }
      },
      error => {
        this.toastr.error(error.error);
      }
    )
  }

}
