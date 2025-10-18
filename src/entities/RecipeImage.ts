export class RecipeImage {
  constructor(
    public id: number,
    public recipeId: number,
    public imageBase64: string
  ) {}
}
