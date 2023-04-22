export class HttpError implements Error {
  name: string;
  message: string;
  status: number;
  constructor(opts: { name: string; message: string; status: number }) {
    this.name = opts.name;
    this.message = opts.message;
    this.status = opts.status;
  }
}

export class MalformedRequestError extends HttpError {
  constructor(message: string) {
    super({
      message: `malformed request: ${message}`,
      name: "MalformedRequestError",
      status: 400,
    });
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super({
      message: `asset not found: ${message}`,
      name: "NotFoundError",
      status: 404,
    });
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string) {
    super({
      message: `internal server error: ${message}`,
      name: "InternalServerError",
      status: 500,
    });
  }
}
