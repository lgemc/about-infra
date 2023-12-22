export enum ErrorTypes {
  UserError = "user-error",
  InternalError = "internal-error",
}

export class UserError extends Error {
  constructor(message: string) {
    super(message);

    this.name = ErrorTypes.UserError;
    this.message = message;
  }
}
