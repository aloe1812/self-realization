import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './effects/user.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { httpInterceptorProviders } from './interceptors';
import { UserService } from './services/user.service';
import { InitService } from './services/init.service';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule, MatTooltipModule } from '@angular/material';
import { ConfirmLogoutDialogComponent } from './components/confirm-logout-dialog/confirm-logout-dialog.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, ConfirmLogoutDialogComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  providers: [
    httpInterceptorProviders,
    UserService,
    InitService,
    {
      provide: APP_INITIALIZER,
      useFactory: (init: InitService) => () => init.init(),
      deps: [InitService],
      multi: true,
    },
  ],
  entryComponents: [ConfirmLogoutDialogComponent],
  exports: [HeaderComponent],
})
export class CoreModule { }
