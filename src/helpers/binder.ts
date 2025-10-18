import { container } from '../providers/container';
import { TYPES } from '../providers/types';
import { Bind, Constructor } from '../utils/Bind';
import { logger } from './logger';

export const binder = <T>(
  ClassToBind: Constructor<T>,
  key: keyof typeof TYPES,
  scope: 'singleton' | 'transient' | 'request' = 'singleton'
) => {
  logger.debug(
    `${ClassToBind.name} binded to the "${key}" key with ${scope} scope`
  );
  const bind = new Bind(container);

  bind.register<T>(ClassToBind, key, scope);
};
