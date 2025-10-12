import { container } from '../providers/container';
import { TYPES } from '../providers/types';
import { Container } from 'inversify';
import { logger } from './logger';

// eslint-disable-next-line
export type Constructor<T = any> = new (...args: any[]) => T;

export class Bind {
  private container: Container;

  constructor(container?: Container) {
    if (!container) this.container = new Container();
    else this.container = container;
  }

  // Binds with the key beeing the class itself
  self = <T>(ClassToBind: Constructor<T>) => {
    this.container.bind<T>(ClassToBind).toSelf();
  };

  // Gets when the key is the class itself
  getSelf = <T>(key: Constructor<T>) => {
    return this.container.get<T>(key);
  };

  // Mock a constant value to tests
  mock = <T>(ClassToBind: T, key: keyof typeof TYPES) => {
    this.container.bind<T>(TYPES[key]).toConstantValue(ClassToBind);
  };

  // Binds a class with the key beeing a key of TYPES
  register = <T>(
    ClassToBind: Constructor<T>,
    key: keyof typeof TYPES,
    scope: 'singleton' | 'transient' | 'request' = 'singleton'
  ) => {
    const binding = this.container.bind<T>(TYPES[key]).to(ClassToBind);

    // Selects the scope
    switch (scope) {
      case 'singleton': // One instance in the hole program
        binding.inSingletonScope();
        break;
      case 'transient': // One instance per inject
        binding.inTransientScope();
        break;
      case 'request': // One instance per request
        binding.inRequestScope();
        break;
      default:
        throw new Error(`Invalid scope -> ${scope}`);
    }
  };

  // Gets when the key is a key of types
  get = <T>(key: keyof typeof TYPES) => {
    return this.container.get<T>(key);
  };
}

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
