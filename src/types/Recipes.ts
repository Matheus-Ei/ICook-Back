import { Recipe } from "../entities/Recipe";

export interface CreateRecipeType extends Omit<Recipe, 'id'> {
  images: Buffer[];
}

export interface CompleteRecipeType extends Recipe {
  images: string[];
  ownerUserName: string;
  comments: {
    author: string;
    comment: string;
    createdAt: string;
  }[];
  comments_count: number;
  rates_count: number;
  average_rate: number;
  is_saved_by_user: boolean;
  user_rate: number | null;
}
