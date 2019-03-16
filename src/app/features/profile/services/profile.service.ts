import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDefaultGroup } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  constructor(
    private http: HttpClient,
  ) { }

  loadGoals(): Observable<IDefaultGroup[]> {
    return this.http.get<IDefaultGroup[]>('/user/default-groups');
  }

}
