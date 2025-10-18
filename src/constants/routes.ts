import { container } from '../providers/container';
import { TYPES } from '../providers/types';
import { Router } from 'express';

// Routes
import { UserRoute } from '../routes/UserRoute';
import { AbstractRoute } from '../routes/AbstractRoute';
import { NotFoundRoute } from '../routes/NotFoundRoute';
import { RecipeRoute } from '../routes/RecipeRoute';
import { RecipeCommentRoute } from '../routes/RecipeCommentRoute';
import { RecipeRateRoute } from '../routes/RecipeRateRoute';

interface RouteType {
  endpoint: string;
  router: Router;
}

const getRouter = <T extends AbstractRoute>(type: keyof typeof TYPES) => {
  return container.get<T>(TYPES[type]).getRouter();
};

export const ROUTES: RouteType[] = [
  { endpoint: '/users', router: getRouter<UserRoute>('UserRoute') },

  { endpoint: '/recipes', router: getRouter<RecipeRoute>('RecipeRoute') },

  { endpoint: '/recipes/comments', router: getRouter<RecipeCommentRoute>('RecipeCommentRoute') },

  { endpoint: '/recipes/rates', router: getRouter<RecipeRateRoute>('RecipeRateRoute') },

  { endpoint: '/', router: getRouter<NotFoundRoute>('NotFoundRoute') },
];
