import { Page } from '../entities/Page';

export interface PageWithModule extends Page {
  moduleTitle?: string | null;
  moduleDescription?: string | null;
}
