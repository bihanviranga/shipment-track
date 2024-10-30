export enum ErrorCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export class ApiError extends Error {
  status: ErrorCode;
  message: string;

  constructor(status: ErrorCode, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
