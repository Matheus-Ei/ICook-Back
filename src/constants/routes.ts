import { container } from '../providers/container';
import { TYPES } from '../providers/types';
import { Router } from 'express';

// Routes
import { UserRoute } from '../routes/UserRoute';
import { AbstractRoute } from '../routes/AbstractRoute';
import { NotFoundRoute } from '../routes/NotFoundRoute';

interface RouteType {
  endpoint: string;
  router: Router;
}

const getRouter = <T extends AbstractRoute>(type: keyof typeof TYPES) => {
  return container.get<T>(TYPES[type]).getRouter();
};

export const ROUTES: RouteType[] = [
  { endpoint: '/users', router: getRouter<UserRoute>('UserRoute') },

  { endpoint: '/', router: getRouter<NotFoundRoute>('NotFoundRoute') },
];
