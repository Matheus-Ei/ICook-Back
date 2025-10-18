export class Recipe {
  constructor(
    public id: number,
    public title: string,
    public ingredients: string,
    public instructions: string,
    public ownerUserId: number,
    public description?: string
  ) {}
}
