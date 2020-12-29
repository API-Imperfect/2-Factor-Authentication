class TwoFactorError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4")
            ? "Client Error"
            : "Server Error";
        this.isOperational = true;
    }
}

module.exports = TwoFactorError;
