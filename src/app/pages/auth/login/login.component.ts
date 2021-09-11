import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	form: FormGroup;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private authService: AuthService,
		private toastr: ToastrService
	) {
		this.form = this.fb.group({
			username: [null, Validators.required],
			password: [null, Validators.required]
		});
	}

	ngOnInit() {
	}

	submit() {
		const auth: any = {};
		auth.username = this.form.value.username;
		auth.password = this.form.value.password;
		this.authService.login(auth).subscribe(
			result => {
				this.toastr.success('Login successfull!');
				localStorage.setItem('user', result);
				console.log(result);
				window.location.reload();
				this.router.navigate(['/nistagram']);
			},
			error => {
				this.toastr.error(error.error);
			}
		);
	}
}
