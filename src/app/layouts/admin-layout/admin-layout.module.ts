import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-type-ahead';

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RegistrationComponent } from "src/app/pages/auth/registration/registration.component";
import { NistagramComponent } from "src/app/pages/nistagram/nistagram.component";
import { RegistrationConfirmationComponent } from "src/app/pages/auth/registration-confirmation/registration-confirmation.component";
import { LoginComponent } from "src/app/pages/auth/login/login.component";
import { NewPostComponent } from "src/app/pages/new-post/new-post.component";
import { UserPostsComponent } from "src/app/pages/user-posts/user-posts.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    TypeaheadModule
  ],
  declarations: [
    RegistrationComponent,
    NistagramComponent,
    RegistrationConfirmationComponent,
    LoginComponent,
    NewPostComponent,
    UserPostsComponent
  ]
})
export class AdminLayoutModule {}
