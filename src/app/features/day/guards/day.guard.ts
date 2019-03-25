import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import dayjs from 'dayjs';

@Injectable({
  providedIn: 'root',
})
export class DayGuard implements CanActivate {

  constructor(
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const day = route.params.date;

    if (day) {
      const parsed = dayjs(day);
      if (parsed.isValid()) {
        const formatted = parsed.format('YYYY-MM-DD');
        /* if day is valid and in expected format, then no redirect
           if format is unexpected, then redirect to valid format */
        return day === formatted ? true : this.router.createUrlTree(['/day', formatted]);
      }
    }

    // no day param or day is invalid => redirect to today
    return this.router.createUrlTree(['/day', dayjs().format('YYYY-MM-DD')]);
  }

}
