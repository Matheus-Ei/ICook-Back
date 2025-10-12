export class Feedback {
  constructor(
    public id: number,
    public userId: number,
    public rating: number,
    public description: string
  ) {}
}
