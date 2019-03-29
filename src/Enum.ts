export enum ErrorMessage {
    Generic = 'Generic Error',
    NotAuthorized = 'Not Authorized',
    NotFound = 'Not Found',
    RateLimited = 'You are doing that too often. Try again later.'
}

export enum ErrorCode {
    Default = 0,
    NotAuthorized = 1,
    NotFound = 2,
    RateLimited = 3
}

export enum StatusCode {
    OK = 200,
    BAD_REQUEST = 400,
    INTERNAL_ERROR = 500,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    RATE_LIMITED = 429
}
