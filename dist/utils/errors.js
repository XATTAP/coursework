"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerValidationError = exports.ApiError = void 0;
class ApiError extends Error {
    constructor(errorCode, message) {
        super(message);
        this.name = "APIError";
        this.message = message || "API error";
        this.errorCode = errorCode || "999";
        this.status = 400;
    }
    toJSON() {
        return {
            errorCode: this.errorCode,
            message: this.message,
            name: this.name,
            status: this.status,
            stack: this.stack,
        };
    }
}
exports.ApiError = ApiError;
class ServerValidationError extends ApiError {
    constructor(errorCode, message, errors) {
        super(...arguments);
        this.name = "ValidationError";
        this.message = message || "Ошибка при валидации данных.";
        this.errorCode = errorCode;
        this.status = 400;
        this.stack = errors;
    }
}
exports.ServerValidationError = ServerValidationError;
