import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDefaultGroup, UpdateGoalDto, IDefaultGoal, DeleteGoalDto, CreateGoalDto } from '../models';
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

  createGoal(createGoalDto: CreateGoalDto): Observable<IDefaultGoal> {
    return this.http.put<IDefaultGoal>('/user/default-groups/goals', createGoalDto);
  }

  updateGoal(updateGoalDto: UpdateGoalDto): Observable<IDefaultGoal> {
    return this.http.post<IDefaultGoal>('/user/default-groups/goals', updateGoalDto);
  }

  deleteGoal(deleteGoalDto: DeleteGoalDto): Observable<any> {
    return this.http.request('delete', '/user/default-groups/goals', { body: deleteGoalDto });
  }

}
