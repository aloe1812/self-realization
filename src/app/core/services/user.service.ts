import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  getMe(token: string) {
    return this.http.get<{username: string}>('/auth/me', {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

}
