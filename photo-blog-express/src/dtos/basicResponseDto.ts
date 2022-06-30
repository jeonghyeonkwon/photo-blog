import { StatusCodes } from "http-status-codes";

export class BasicResponseDto<T> {
  statusCode!: StatusCodes;
  data!: T;

  constructor(statusCode: StatusCodes, data: T) {
    this.statusCode = statusCode;
    this.data = data;
  }
}
