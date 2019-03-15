import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Authenticate, AuthResponse } from '../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  signIn(auth: Authenticate): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/auth/signin', auth);
  }

  signUp(auth: Authenticate): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/auth/signup', auth);
  }

}
