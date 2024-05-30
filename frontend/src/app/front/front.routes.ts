import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './guards/auth.guard';
import path from 'path';
import { AddPassengerComponent } from './add-passenger/add-passenger.component';
import { ManageComponent } from './manage/manage.component';
import { EditComponent } from './edit/edit.component';
import { SearchResultsComponent } from './search-results/search-results.component';

export const frontRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: LandingPageComponent,
      },
      {
        path: 'search-results',
        component: SearchResultsComponent,
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'profile',

        children: [
          {
            path: '',
            pathMatch: 'full',
            component: ProfileComponent,
            // canActivate: [authGuard],
          },
        ],
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'co-passengers',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: ManageComponent,
          },
          {
            path: 'add',
            component: AddPassengerComponent,
          },
          {
            path: ':copassengerID',
            component: AddPassengerComponent,
          },
        ],
      },
    ],
  },
];
