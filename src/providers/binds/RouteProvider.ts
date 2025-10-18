import { binder } from '../../helpers/binder';

// Routes
import { UserRoute } from '../../routes/UserRoute';
import { NotFoundRoute } from '../../routes/NotFoundRoute';
import { TokenRoute } from '../../routes/TokenRoute';
import { RecipeRoute } from '../../routes/RecipeRoute';
import { RecipeCommentRoute } from '../../routes/RecipeCommentRoute';
import { RecipeRateRoute } from '../../routes/RecipeRateRoute';
import { UserSavedRecipeRoute } from '../../routes/UserSavedRecipeRoute';
import { UserFollowRoute } from '../../routes/UserFollowRoute';

binder(NotFoundRoute, 'NotFoundRoute');
binder(TokenRoute, 'TokenRoute');
binder(UserRoute, 'UserRoute');
binder(RecipeRoute, 'RecipeRoute');
binder(RecipeCommentRoute, 'RecipeCommentRoute');
binder(RecipeRateRoute, 'RecipeRateRoute');
binder(UserSavedRecipeRoute, 'UserSavedRecipeRoute');
binder(UserFollowRoute, 'UserFollowRoute');
