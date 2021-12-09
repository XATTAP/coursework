export class ApiError extends Error {
  public status: number;
  public errorCode: string;

  constructor(errorCode?: string, message?: string) {
    super(message);

    this.name = "APIError";
    this.message = message || "API error";
    this.errorCode = errorCode || "999";
    this.status = 400;
  }

  public toJSON() {
    return {
      errorCode: this.errorCode,
      message: this.message,
      name: this.name,
      status: this.status,
      stack: this.stack,
    };
  }
}

export class ServerValidationError extends ApiError {
  constructor(errorCode?: string, message?: string, errors?: any) {
    super(...arguments);

    this.name = "ValidationError";
    this.message = message || "Ошибка при валидации данных.";
    this.errorCode = errorCode;
    this.status = 400;
    this.stack = errors;
  }
}
