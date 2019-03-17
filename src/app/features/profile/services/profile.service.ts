import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDefaultGroup, UpdateGoalDto, IDefaultGoal } from '../models';
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

  updateGoal(updateGoalDto: UpdateGoalDto): Observable<IDefaultGoal> {
    return this.http.post<IDefaultGoal>('/user/default-groups/goals', updateGoalDto);
  }

}
