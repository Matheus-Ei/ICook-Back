// Models
import { RecipeCommentsModel } from '../models/RecipeCommentsModel';
import { RecipeImagesModel } from '../models/RecipeImagesModel';
import { RecipeRatesModel } from '../models/RecipeRatesModel';
import { RecipesModel } from '../models/RecipesModel';
import { UserFollowsModel } from '../models/UserFollowsModel';
import { UserSavedRecipesModel } from '../models/UserSavedRecipesModel';
import { UsersModel } from '../models/UsersModel';

// Here the order matters
export const MODELS = [
  UsersModel,
  RecipesModel, 
  RecipeImagesModel,
  RecipeCommentsModel,
  UserSavedRecipesModel,
  RecipeRatesModel,
  UserFollowsModel,
];
