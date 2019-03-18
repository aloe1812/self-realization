import { GroupType } from '../../../enums';
export * from './dto';

export interface IDefaultGroup {
  _id: string;
  type: GroupType;
  goals: IDefaultGoal[];
}

export interface IDefaultGoal {
  _id: string;
  title: string;

  isSaving?: boolean;
  isDeleting?: boolean;
}

export interface INewDefaultGoal {
  title: string;
  isSaving?: boolean;
}

export interface NormalizedGoals {
  byId: {
    [key: string]: IDefaultGoal;
  };
  allIds: string[];
}

export interface AddGoalStatus {
  isSaving: boolean;
}
