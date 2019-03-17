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

export interface UpdateGoalDto {
  id: string;
  title: string;
  typeId: string;
}
