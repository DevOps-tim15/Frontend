import { Component, OnInit} from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  router: Router;
  authService: AuthService;
  toastr: ToastrService;

  constructor(
    location: Location,
    router: Router,
    authService: AuthService,
    toastr: ToastrService
   
  ) {
    this.router = router;
    this.location = location;
    this.authService = authService;
    this.toastr = toastr;
  }
 
  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "Posts";
  }

  register(){
    this.router.navigate(['/register']);
  }

  loggedIn(){
    return this.authService.isLoggedIn();
  }

  login(){
    this.router.navigate(['/login']);
  }

  logout() {
    console.log("HEJ")
		this.authService.logout().subscribe(
			result => {
				localStorage.removeItem('user');
        window.location.reload();
				this.router.navigate(['/login']);
			},
			error => {
				this.toastr.error(error.error);
        console.log(error);
			}
		);
  }

  newPost(){
    this.router.navigate(['/new-post']);
  }

  editProfile(){
    this.router.navigate(['/edit-profile']);
  }
}
