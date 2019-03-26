import { HttpErrorResponse } from '@angular/common/http';
import { ApiError, NormalizedItems } from '../models/common';
import { IDefaultGoal } from '../features/profile/models';
import { Goal } from '../features/day/models';
import { GroupType } from '../enums';

export const GroupTypes = enumToArray(GroupType);

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

export function goalsNormalizer<T extends Goal & IDefaultGoal>(result: NormalizedItems<T>, goal: T): NormalizedItems<T> {
  result.byId[goal._id] = goal;
  result.allIds.push(goal._id);
  return result;
}

export function groupSorter(a: GroupType, b: GroupType) {
  const indexA = GroupTypes.indexOf(a);
  const indexB = GroupTypes.indexOf(b);
  return indexA - indexB;
}
