import { GroupType } from '../../../enums';

export interface Day {
  _id: string;
  userId: string;
  date: string;
  complete: number;
  groups: Group[];
}

export interface Group {
  _id: string;
  type: GroupType;
  complete: number;
  goals: Goal[];
}

export interface Goal {
  _id: string;
  title: string;
  complete: number;
}
