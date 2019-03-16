import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { EndpointInterceptor } from './endpoint-interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: EndpointInterceptor, multi: true },
];
