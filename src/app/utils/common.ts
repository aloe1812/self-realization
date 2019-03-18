import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from '../models/common';

export function extractErrorMessage(error: HttpErrorResponse): string {
  if (error.status >= 500) {
    return 'Server Error. Try again later';
  }

  if (error.error && (error.error as ApiError).message) {
    return (error.error as ApiError).message;
  }

  return 'Unknown error';
}

export function enumToArray(enumObject: object): string[] {
  return Object.keys(enumObject).map(key => enumObject[key]);
}
