// statusCodes.js
const STATUS_CODES = {
    BAD_REQUEST: {
        code: 400,
        message: "Bad Request: Invalid input or request format.",
    },
    OK: {
        code: 200,
        message: "Success: The operation was successful.",
    },
    NOT_FOUND: {
        code: 404,
        message: "Not Found: The requested resource could not be found.",
    },
    INTERNAL_SERVER_ERROR: {
        code: 500,
        message: "Internal Server Error: Something went wrong on the server.",
    },
    // Add more status codes as needed
};

export default STATUS_CODES;
