export class UserSubscription {
  constructor(
    public id: number,
    public subscriptionPlanId: number,
    public userId: number,
    public status: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
