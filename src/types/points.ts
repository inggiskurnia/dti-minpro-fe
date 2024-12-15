export interface GetTotalUserPointsParams {
  userId: number;
}

export interface GetTotalUserPointsResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: number;
}
