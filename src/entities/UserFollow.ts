export class UserFollow {
  constructor(
    public id: number,
    public followerUserId: number,
    public followedUserId: number,
  ) {}
}
