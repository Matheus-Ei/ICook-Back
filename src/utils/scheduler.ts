import cron from 'node-cron';
import { logger } from '../utils/logger';

interface JobType {
  name: string;
  job: { run: () => void };
  cron: string;
}

export class Scheduler {
  static make(schedules: JobType[]) {
    for (const schedule of schedules) {
      try {
        cron.schedule(schedule.cron, () => {
          logger.info(`Executing job: ${schedule.name}`);
          schedule.job.run();
        });

        logger.info(`Job scheduled: ${schedule.name} | ${schedule.cron}`);
      } catch (error: unknown) {
        logger.error(`Fail to schedule ${schedule.name}: ${error}`);
      }
    }
  }
}
