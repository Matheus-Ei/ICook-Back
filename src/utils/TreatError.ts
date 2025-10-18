export class TreatError {
  static stringify = (error: unknown) => {
    if (!error) {
      return undefined;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return String(error);
    }
  };
}
