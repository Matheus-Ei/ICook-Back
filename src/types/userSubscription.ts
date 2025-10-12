export interface CompleteUserSubscription {
  id: number;
  plan_id: number;
  created_at: Date;
  status: string;
  user_id: number;
  plan_title: string;
  plan_duration: object;
  plan_price: number;
}
