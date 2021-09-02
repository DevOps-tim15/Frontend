import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RegistrationComponent } from "src/app/pages/auth/registration/registration.component";
import { NistagramComponent } from "src/app/pages/nistagram/nistagram.component";
import { RegistrationConfirmationComponent } from "src/app/pages/auth/registration-confirmation/registration-confirmation.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  declarations: [
    RegistrationComponent,
    NistagramComponent,
    RegistrationConfirmationComponent
  ]
})
export class AdminLayoutModule {}
