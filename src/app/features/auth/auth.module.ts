import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { MatCardModule, MatButtonModule, MatInputModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AboutSiteComponent } from './components/about-site/about-site.component';

@NgModule({
  declarations: [LoginPageComponent, LoginFormComponent, AboutSiteComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
  ],
})
export class AuthModule { }
