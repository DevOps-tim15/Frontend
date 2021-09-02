import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration-confirmation',
  templateUrl: './registration-confirmation.component.html',
  styleUrls: ['./registration-confirmation.component.scss']
})
export class RegistrationConfirmationComponent implements OnInit {

  private token;

  constructor(private activatedRoute: ActivatedRoute, 
              private authenticationService: AuthService,
              private router: Router, 
              private toastr: ToastrService) {
    this.activatedRoute.params.subscribe(params => {
    this.token = params['token'];
    this.confirmReg();
  })
}

  ngOnInit() {
  }

  confirmReg(){
    console.log("token");
    console.log(this.token);
    this.authenticationService.confirmRegistration(this.token).subscribe(
			result => {
        this.toastr.success('Successfull registration and verification! Now you can sign in.');
        setTimeout(()=>
				this.router.navigate(['login']), 500)
			},
			error => {
				this.toastr.error(error.error);
			}
		);
  }

}

