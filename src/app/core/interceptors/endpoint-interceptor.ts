import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG } from '../../config/app.config';
import { IAppConfig } from '../../config/app.config.d';

@Injectable()
export class EndpointInterceptor implements HttpInterceptor {

  constructor(
    @Inject(APP_CONFIG) private config: IAppConfig,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const newReq = req.clone({
      url: this.config.endpoint + req.url,
    });

    return next.handle(newReq);
  }

}
