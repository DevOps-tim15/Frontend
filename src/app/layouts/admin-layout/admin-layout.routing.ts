import { Routes } from "@angular/router";
import { LoginGuard } from "src/app/guards/login.service";
import { LoginComponent } from "src/app/pages/auth/login/login.component";

import { RegistrationConfirmationComponent } from "src/app/pages/auth/registration-confirmation/registration-confirmation.component";
import { RegistrationComponent } from "src/app/pages/auth/registration/registration.component";
import { EditProfileComponent } from "src/app/pages/edit-profile/edit-profile.component";
import { NewPostComponent } from "src/app/pages/new-post/new-post.component";
import { NistagramComponent } from "src/app/pages/nistagram/nistagram.component";

export const AdminLayoutRoutes: Routes = [
  { path: "login", component: LoginComponent,canActivate: [LoginGuard] },  
  { path: "register", component: RegistrationComponent,  canActivate: [LoginGuard]},  
  { path: "nistagram", component: NistagramComponent },
  { path: "liked-disliked", component: NistagramComponent,
  data: { expectedRoles: 'ROLE_REGISTERED_USER|ROLE_AGENT' }},
  { path: "edit-profile", component: EditProfileComponent,
  data: { expectedRoles: 'ROLE_REGISTERED_USER|ROLE_AGENT' }},
  {
    path: 'registration/confirmation/:token',
    component: RegistrationConfirmationComponent
  },  
  { path: 'new-post', component: NewPostComponent,
  data: { expectedRoles: 'ROLE_REGISTERED_USER|ROLE_AGENT' }},
  { path: 'user-posts', component: NistagramComponent,
   data: { expectedRoles: 'ROLE_REGISTERED_USER|ROLE_AGENT' }},
   { path: 'saved-posts', component: NistagramComponent,
   data: { expectedRoles: 'ROLE_REGISTERED_USER|ROLE_AGENT' }}
];
