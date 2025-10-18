import { binder } from '../../helpers/binder';

// Repositories
import { UserRepository } from '../../repositories/UserRepository';

binder(UserRepository, 'UserRepository');
