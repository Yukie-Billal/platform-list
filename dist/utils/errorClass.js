"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpInternalError = exports.HttpBadRequest = exports.HttpNotFound = void 0;
class HttpNotFound extends Error {
    constructor(message) {
        super(message);
    }
}
exports.HttpNotFound = HttpNotFound;
class HttpBadRequest extends Error {
    constructor(message, errors) {
        super(message);
        this.errors = errors;
    }
}
exports.HttpBadRequest = HttpBadRequest;
class HttpInternalError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.HttpInternalError = HttpInternalError;
