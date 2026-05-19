export class ErrorInstance extends Error {
    constructor(message, statusCode, stack) {
        super(message)
        this.stack      = stack
        this.message    = message
        this.statusCode = statusCode
        this.name       = this.constructor.name
    }
}
