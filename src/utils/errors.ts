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

export class AuthenticationError extends ApiError {
  constructor(errorCode?: string, message?: string, errors?: any) {
    super(...arguments);

    this.name = "AuthenticationError";
    this.message = message || "Невозможно провести аутентификацию.";
    this.errorCode = errorCode;
    this.status = 401;
    this.stack = errors;
  }
}

export class NotFoundError extends ApiError {
  constructor(errorCode?: string, message?: string) {
    super(...arguments);

    this.name = "NotFoundError";
    this.message = message || "Объект не найден.";
    this.status = 402;
    this.errorCode = errorCode;
  }
}
