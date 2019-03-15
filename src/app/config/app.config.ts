import { InjectionToken } from '@angular/core';
import { IAppConfig } from './app.config.d';

export const CONFIG: IAppConfig = {
  endpoint: 'http://localhost:3000',
};

export const APP_CONFIG = new InjectionToken<IAppConfig>('app.config');
export const appConfigProvider = { provide: APP_CONFIG, useValue: CONFIG };
