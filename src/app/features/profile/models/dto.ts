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
