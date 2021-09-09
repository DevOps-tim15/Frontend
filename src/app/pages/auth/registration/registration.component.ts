import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
	formReg: FormGroup;
	waitngForConfirmation;

	constructor(
	  private fb: FormBuilder,
	  private router: Router,
	  private authenticationService: AuthService,
	  private toastr: ToastrService
  ) {
	  this.formReg = this.fb.group({
			username : ['', Validators.required],
			password: ['', Validators.required],
			repeatedPassword : ['', Validators.required],
			firstname : ['', Validators.required],
			lastname : ['', Validators.required],
			email : ['', Validators.compose([
				Validators.required,
				Validators.email])],
			phone: [''],
			websiteUrl: [''],
			sex: [''],
			biography: [''],
			birthDate: [''],
			canBeTagged: [false],
			isPrivate: [false],
	  });
  }

	ngOnInit() {
	}

	submit() {
	  const user: any = {};
	  user.username = this.formReg.value.username;
	  user.password = this.formReg.value.password;
	  const repeatedPassword = this.formReg.value.repeatedPassword;
	  if(user.password !== repeatedPassword){
		this.toastr.error("Passwords are not the same");
		return;
	  }
	  user.firstName = this.formReg.value.firstname;
	  user.lastName = this.formReg.value.lastname;
	  user.email = this.formReg.value.email;
	  user.phone = this.formReg.value.phone;
	  user.websiteUrl = this.formReg.value.websiteUrl;
	  user.sex =  this.formReg.value.sex;
	  user.biography = this.formReg.value.biography;
	  user.birthDate = this.formReg.value.birthDate;
	  user.canBeTagged = this.formReg.value.canBeTagged;
	  user.isPrivate = this.formReg.value.isPrivate;
	  console.log(user);
	  this.authenticationService.register(user).subscribe(
		  result => {
			  this.waitngForConfirmation = true;
			  console.log(result)
		  },
		  error => {
			console.log(error);
			this.toastr.error(error.error);
		  }
	  );
  }
}
