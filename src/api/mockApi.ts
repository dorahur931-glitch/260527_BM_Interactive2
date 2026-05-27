import type { FoodId, GuestbookEntry, SharePlatform, UserEventStatus } from '../types';

const STATUS_KEY = 'doljanchi_status';
const GUESTBOOK_KEY = 'doljanchi_guestbook';
const MOCK_USER_ID = 'mock-user-001';

const SEED_GUESTBOOK: GuestbookEntry[] = [
  {
    entry_id: 'seed-1',
    user_id: 'seed',
    nickname: '배민이팬',
    message: '첫 돌 축하해요! 앞으로도 건강하게 자라렴 🎂',
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    entry_id: 'seed-2',
    user_id: 'seed',
    nickname: '익명',
    message: '작은 축하가 큰 힘이 되길 바랍니다. 응원해요!',
    created_at: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    entry_id: 'seed-3',
    user_id: 'seed',
    nickname: '맘마미아',
    message: '돌잔치 못 치러도 마음만큼은 함께할게요. 화이팅!',
    created_at: new Date(Date.now() - 10800000).toISOString(),
  },
];

function loadGuestbook(): GuestbookEntry[] {
  const raw = localStorage.getItem(GUESTBOOK_KEY);
  if (!raw) {
    localStorage.setItem(GUESTBOOK_KEY, JSON.stringify(SEED_GUESTBOOK));
    return [...SEED_GUESTBOOK];
  }
  return JSON.parse(raw) as GuestbookEntry[];
}

function saveGuestbook(entries: GuestbookEntry[]) {
  localStorage.setItem(GUESTBOOK_KEY, JSON.stringify(entries));
}

function defaultStatus(): UserEventStatus {
  const now = new Date().toISOString();
  return {
    user_id: MOCK_USER_ID,
    food_selected: null,
    retry_used: false,
    guestbook_done: false,
    coupon_issued: false,
    coupon_code: null,
    created_at: now,
    updated_at: now,
  };
}

function loadStatus(): UserEventStatus {
  const raw = localStorage.getItem(STATUS_KEY);
  if (!raw) return defaultStatus();
  return JSON.parse(raw) as UserEventStatus;
}

function saveStatus(status: UserEventStatus) {
  localStorage.setItem(STATUS_KEY, JSON.stringify(status));
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function generateCouponCode(): string {
  const part = () => Math.random().toString(36).slice(2, 6).toUpperCase();
  return `DOL-${part()}-${part()}`;
}

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>
) {
  if (import.meta.env.DEV) {
    console.info('[Analytics]', name, params ?? {});
  }
}

export async function getStatus(): Promise<UserEventStatus> {
  await delay(150);
  return loadStatus();
}

export async function selectFood(foodId: FoodId): Promise<UserEventStatus> {
  await delay(200);
  const status = loadStatus();
  if (status.food_selected && status.food_selected !== foodId) {
    throw new Error('이미 선택한 음식이 있습니다.');
  }
  const updated: UserEventStatus = {
    ...status,
    food_selected: foodId,
    updated_at: new Date().toISOString(),
  };
  saveStatus(updated);
  trackEvent('doljanchi_food_select', { user_id: status.user_id, food_id: foodId });
  return updated;
}

export async function resetSelection(): Promise<UserEventStatus> {
  await delay(200);
  const status = loadStatus();
  if (status.retry_used) throw new Error('다시 뽑기는 1회만 가능합니다.');
  const updated: UserEventStatus = {
    ...status,
    food_selected: null,
    retry_used: true,
    updated_at: new Date().toISOString(),
  };
  saveStatus(updated);
  return updated;
}

export async function getGuestbook(page = 1, limit = 10): Promise<GuestbookEntry[]> {
  await delay(100);
  const all = loadGuestbook().sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  return all.slice(0, page * limit);
}

export async function postGuestbook(
  nickname: string,
  message: string
): Promise<GuestbookEntry> {
  await delay(400);
  const status = loadStatus();
  if (status.guestbook_done) throw new Error('이미 방명록에 참여하셨습니다.');

  const entry: GuestbookEntry = {
    entry_id: crypto.randomUUID(),
    user_id: status.user_id,
    nickname: nickname.trim() || '익명',
    message: message.trim(),
    created_at: new Date().toISOString(),
  };

  const entries = [entry, ...loadGuestbook()];
  saveGuestbook(entries);

  const updated: UserEventStatus = {
    ...status,
    guestbook_done: true,
    updated_at: new Date().toISOString(),
  };
  saveStatus(updated);
  trackEvent('doljanchi_guestbook_submit', { user_id: status.user_id });
  return entry;
}

export async function issueCoupon(): Promise<UserEventStatus> {
  await delay(500);
  const status = loadStatus();
  if (!status.guestbook_done) throw new Error('방명록 참여 후 쿠폰을 받을 수 있습니다.');
  if (status.coupon_issued) return status;

  const code = generateCouponCode();
  const updated: UserEventStatus = {
    ...status,
    coupon_issued: true,
    coupon_code: code,
    updated_at: new Date().toISOString(),
  };
  saveStatus(updated);
  trackEvent('doljanchi_coupon_issue', {
    user_id: status.user_id,
    coupon_code: code,
  });
  return updated;
}

export async function logShare(platform: SharePlatform): Promise<void> {
  await delay(50);
  const status = loadStatus();
  trackEvent('doljanchi_share', { user_id: status.user_id, platform });
}

export function resetAllProgress() {
  localStorage.removeItem(STATUS_KEY);
  localStorage.removeItem(GUESTBOOK_KEY);
}
