export type FoodId = 'noodle' | 'chicken' | 'salad' | 'bibimbap' | 'pizza';

export type SharePlatform = 'kakao' | 'instagram' | 'link';

export interface UserEventStatus {
  user_id: string;
  food_selected: FoodId | null;
  retry_used: boolean;
  guestbook_done: boolean;
  coupon_issued: boolean;
  coupon_code: string | null;
  created_at: string;
  updated_at: string;
}

export interface GuestbookEntry {
  entry_id: string;
  user_id: string;
  nickname: string;
  message: string;
  created_at: string;
}

export interface FoodItem {
  id: FoodId;
  name: string;
  icon: string;
  keyword: string;
  copy: string;
  position: { top: string; left: string };
  floatDelay: string;
}
