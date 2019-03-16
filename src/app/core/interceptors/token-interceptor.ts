import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State, selectToken } from '../reducers';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private token: string;

  constructor(
    private store: Store<State>,
  ) {
    this.store.pipe(select(selectToken)).subscribe(token => this.token = token);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.token) {
      const newReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      return next.handle(newReq);
    }

    return next.handle(req);
  }

}
