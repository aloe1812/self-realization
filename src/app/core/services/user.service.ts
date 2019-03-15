import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  getMe(token: string): Observable<any> {
    return this.http.get('http://localhost:3000/auth/me', {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

}
