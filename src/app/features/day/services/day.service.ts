import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Day } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DayService {

  constructor(
    private http: HttpClient,
  ) { }

  loadDay(date: string): Observable<Day> {
    return this.http.get<Day>('/day', {
      params: { date },
    });
  }

}
