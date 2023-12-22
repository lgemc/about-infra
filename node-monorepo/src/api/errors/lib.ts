export interface BodyError {
  error: {
    message: string;
  };
}

export function error(message: string): BodyError {
  return {
    error: {
      message,
    },
  };
}

export const InternalServerError: BodyError = {
  error: {
    message: "internal server error",
  },
};
