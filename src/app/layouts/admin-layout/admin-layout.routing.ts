import { Routes } from "@angular/router";

import { RegistrationConfirmationComponent } from "src/app/pages/auth/registration-confirmation/registration-confirmation.component";
import { RegistrationComponent } from "src/app/pages/auth/registration/registration.component";
import { NistagramComponent } from "src/app/pages/nistagram/nistagram.component";

export const AdminLayoutRoutes: Routes = [
  { path: "register", component: RegistrationComponent },  
  { path: "nistagram", component: NistagramComponent },
  {
    path: 'registration/confirmation/:token',
    component: RegistrationConfirmationComponent
  },

];
