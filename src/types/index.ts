export interface ResponseType<T = object> {
  message: string;
  resource?: T;
  error?: string;
}

export type AsyncMaybe<T> = Promise<T | null>;

export type Editable<T> = Partial<Omit<T, 'id'>>;
