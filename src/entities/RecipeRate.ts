export class RecipeRate {
  constructor(
    public id: number,
    public recipeId: number,
    public userId: number,
    public rate: number
  ) {}
}
