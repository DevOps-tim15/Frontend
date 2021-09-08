import { Routes } from "@angular/router";
import { LoginGuard } from "src/app/guards/login.service";
import { LoginComponent } from "src/app/pages/auth/login/login.component";

import { RegistrationConfirmationComponent } from "src/app/pages/auth/registration-confirmation/registration-confirmation.component";
import { RegistrationComponent } from "src/app/pages/auth/registration/registration.component";
import { NewPostComponent } from "src/app/pages/new-post/new-post.component";
import { NistagramComponent } from "src/app/pages/nistagram/nistagram.component";
import { UserPostsComponent } from "src/app/pages/user-posts/user-posts.component";

export const AdminLayoutRoutes: Routes = [
  { path: "login", component: LoginComponent,canActivate: [LoginGuard] },  
  { path: "register", component: RegistrationComponent,  canActivate: [LoginGuard]},  
  { path: "nistagram", component: NistagramComponent },
  {
    path: 'registration/confirmation/:token',
    component: RegistrationConfirmationComponent
  },  
  { path: 'new-post', component: NewPostComponent,
  data: { expectedRoles: 'ROLE_REGISTERED_USER|ROLE_AGENT' }},
  { path: 'user-posts', component: UserPostsComponent,
   data: { expectedRoles: 'ROLE_REGISTERED_USER|ROLE_AGENT' }}
];
