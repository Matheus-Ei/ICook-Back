export class RecipeComment{
  constructor(
    public id: number,
    public recipeId: number,
    public userId: number,
    public comment: string
  ) {}
}
