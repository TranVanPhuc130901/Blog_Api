'use strict'

const StatusCode = {
    OK: 200,
    CREATED: 201
}

const ResponStatusCode = {
    OK: "Success",
    CREATED: "Created"
}


class SuccessResponse {
    constructor({message, statusCode = StatusCode.OK, responStatusCode = ResponStatusCode.OK, metadata = {}}) {
        this.message = !message ? responStatusCode : message;
        this.status = statusCode;
        // this.responStatusCode = responStatusCode;
        this.metadata = metadata;
    }

    send(res, headers = {}) {
        return res.status(this.status).json(this);
    }
}



class OK extends SuccessResponse {
    constructor({message, metadata}) {
        super({message, metadata});
    }
}


class CREATED extends SuccessResponse {
    constructor({options , message , statusCode = StatusCode.CREATED , responStatusCode = ResponStatusCode.CREATED , metadata}) {
        super({message,statusCode,responStatusCode, metadata});
        this.options = options;
    }
}



module.exports = {
    OK,
    CREATED,
    SuccessResponse
}