import { binder } from '../../utils/binder';

// Repositories
import { UserRepository } from '../../repositories/UserRepository';

binder(UserRepository, 'UserRepository');
