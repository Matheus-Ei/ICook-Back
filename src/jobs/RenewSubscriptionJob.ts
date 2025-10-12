import { UserSubscriptionService } from '../services/UserSubscriptionService';
import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { logger } from '../utils/logger';

@injectable()
export class RenewSubscriptionJob {
  constructor(
    @inject(TYPES.UserSubscriptionService)
    private subscriptionService: UserSubscriptionService
  ) {}

  public async run(): Promise<void> {
    logger.info('Starting subscription renew...');

    try {
      await this.subscriptionService.renewAllExpired();
      logger.info('Renew finished.');
    } catch (error: unknown) {
      logger.error(`Error renewing: ${error}`);
    }
  }
}
