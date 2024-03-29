"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.status = statusCode >= 500 ? "error" : "fail";
    }
}
exports.default = AppError;
