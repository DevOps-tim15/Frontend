import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  loggedUser: any;
	formEdit: FormGroup;
	waitngForConfirmation;

	constructor(
	  private fb: FormBuilder,
	  private router: Router,
	  private authenticationService: AuthService,
	  private toastr: ToastrService
  ) {
	  this.formEdit = this.fb.group({
			username : ['', Validators.required],
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

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void{    
    this.authenticationService.getLoggedIn().subscribe(
    user => {
      this.loggedUser = user;
      console.log(user);
      this.formEdit.patchValue({
        username : user.username,
        firstname : user.firstName,
        lastname : user.lastName,
        email : user.email,
        phone: user.phone,
        websiteUrl: user.websiteUrl,
        sex: user.sex,
        biography: user.biography,
        birthDate: user.birthDate,
        canBeTagged: user.canBeTagged,
        isPrivate: user.isPrivate,
      });
    },
    error => {
      this.toastr.error(error.error);
    }
    )
  }

	submit() {
	  const user: any = {};
	  user.username = this.formEdit.value.username;
	  user.firstName = this.formEdit.value.firstname;
	  user.lastName = this.formEdit.value.lastname;
	  user.email = this.formEdit.value.email;
	  user.phone = this.formEdit.value.phone;
	  user.websiteUrl = this.formEdit.value.websiteUrl;
	  user.sex =  this.formEdit.value.sex;
	  user.biography = this.formEdit.value.biography;
	  user.birthDate = this.formEdit.value.birthDate;
	  user.canBeTagged = this.formEdit.value.canBeTagged;
	  user.isPrivate = this.formEdit.value.isPrivate;
	  console.log(user);
	  this.authenticationService.update(user).subscribe(
		  result => {
        this.toastr.success("You have successfully updated your profile!");
			  console.log("result");
        console.log(result);
        if(result!=="noToken"){
          console.log(result);
          localStorage.removeItem('user');
          localStorage.setItem('user', result);
        }
		  },
      error => {
			  console.log(error);
			  this.toastr.error(error.error);
		  }
	  );
  }
}
