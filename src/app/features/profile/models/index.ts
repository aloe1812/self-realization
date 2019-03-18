import { GroupType } from '../../../enums';

export interface IDefaultGroup {
  _id: string;
  type: GroupType;
  goals: IDefaultGoal[];
}

export interface IDefaultGoal {
  _id: string;
  title: string;
}

export interface IAddDefaultGoal {
  title: string;
}

export interface CreateGoalDto {
  title: string;
  typeId: string;
}

export interface UpdateGoalDto {
  id: string;
  title: string;
  typeId: string;
}

export interface DeleteGoalDto {
  id: string;
  typeId: string;
}
