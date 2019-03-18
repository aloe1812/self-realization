import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { EndpointInterceptor } from './endpoint-interceptor';
import { TokenInterceptor } from './token-interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: EndpointInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
];
