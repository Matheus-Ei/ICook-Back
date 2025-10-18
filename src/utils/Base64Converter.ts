import { TreatError } from './TreatError';
import { logger } from '../helpers/logger';

export class Base64Converter {
  static encode = (data: Buffer): string | null => {
    try {
      return data.toString('base64');
    } catch (error) {
      logger.error(TreatError.stringify(error));
      return null;
    }
  };

  static decode = (encodedData: string): Buffer | null => {
    try {
      if (typeof encodedData !== 'string') {
        throw new Error('Input for decoding must be a Base64 string.');
      }

      return Buffer.from(encodedData, 'base64');
    } catch (error) {
      logger.error(TreatError.stringify(error));
      return null;
    }
  };
}
