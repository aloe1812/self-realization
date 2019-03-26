export interface ApiError {
  statusCode: string;
  error: string;
  message: string;
}

export interface NormalizedItems<T> {
  byId: {
    [key: string]: T;
  };
  allIds: string[];
}
