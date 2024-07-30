'user strict'

const { ReasonPhrases, StatusCodes } = require("../untils/httpStatusCode");


// const StatusCode = {
//     FORBIDDEN: 403,
//     CONFLICT: 409
// }

// const ResponStatusCode = {
//     FORBIDDEN: "Bad Request",
//     CONFLICT: "CONFLICT Errot"
// }


class ErrorResponse extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;    
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = ReasonPhrases.CONFLICT, statusCode = StatusCodes.CONFLICT) {
        super(message, statusCode);
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = ReasonPhrases.FORBIDDEN, statusCode = StatusCodes.FORBIDDEN) {
        super(message, statusCode);
    }
}

class AuthFailureError extends ErrorResponse {
    constructor(message = ReasonPhrases.UNAUTHORIZED, statusCode = StatusCodes.UNAUTHORIZED) {
        super(message, statusCode);
    }
}

class NotFroundError extends ErrorResponse {
    constructor(message = ReasonPhrases.NOT_FOUND, statusCode = StatusCodes.NOT_FOUND) {
        super(message, statusCode);
    }
}


class ForbiddenError extends ErrorResponse {
    constructor(message = ReasonPhrases.FORBIDDEN, statusCode = StatusCodes.FORBIDDEN) {
        super(message, statusCode);
    }
}

class RedisErrorResponse extends ErrorResponse {
    constructor(message = ReasonPhrases.INTERNAL_SERVER_ERROR, statusCode = StatusCodes.INTERNAL_SERVER_ERROR) {
        super(message, statusCode);
    }
}

module.exports = {
    ConflictRequestError,
    BadRequestError,
    NotFroundError,
    AuthFailureError,
    ForbiddenError,
    RedisErrorResponse
}