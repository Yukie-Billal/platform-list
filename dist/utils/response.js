"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const statusList = {
    '200': "ok",
    '400': 'bad request',
    '401': 'unauthorize',
    '403': 'forbidden',
    '404': 'not found',
    '500': 'internal server error',
    '504': 'server timeout',
};
class ApiResponse {
    constructor(data, message, status, errors = null) {
        this.data = data;
        this.message = message;
        this.status = status;
        this.statusMessage = this.getStatusMessage(status);
        this.errors = errors;
    }
    send(res) {
        res.status(this.status).json(this.getJson());
    }
    getJson() {
        return {
            statusMessage: this.statusMessage,
            message: this.message,
            data: this.data,
            errors: this.errors
        };
    }
    getStatusMessage(s) {
        return statusList[s];
    }
    static success(data, message = "", status = 200) {
        return new ApiResponse(data, message, status);
    }
    static badRequest(errors, message, status = 400) {
        return new ApiResponse(null, message, status, errors);
    }
    static unAuthorized() {
        return new ApiResponse(null, "unauthorized", 401);
    }
    static forbidden() {
        return new ApiResponse(null, "forbidden", 403);
    }
    static notFound(message, status = 404, errors = null) {
        return new ApiResponse(null, message, status, errors);
    }
    static internalError(message, error = null, status = 500) {
        return new ApiResponse(null, message, status, error);
    }
}
exports.default = ApiResponse;
