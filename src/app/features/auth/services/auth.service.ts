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
    return this.http.post<AuthResponse>('http://localhost:3000/auth/signin', auth);
  }

}
