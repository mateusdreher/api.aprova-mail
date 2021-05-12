class ErrorDto {
  status: number;
  error: string;
  message: string;
}

export class ResponseErrorDto {
  constructor(public mehtodError: string, public error: ErrorDto) {}
}
