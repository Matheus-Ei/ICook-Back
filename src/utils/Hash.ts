import bcrypt from 'bcrypt';

export class Hash {
  static make = async (text: string, saltRounds = 10) => {
    return await bcrypt.hash(text, saltRounds);
  };

  static compare = async (text: string, hash: string) => {
    return await bcrypt.compare(text, hash);
  };
}
