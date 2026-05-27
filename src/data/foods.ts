import type { FoodItem } from '../types';

export const FOODS: FoodItem[] = [
  {
    id: 'noodle',
    name: '잔치국수',
    icon: '🍜',
    keyword: '끈기',
    copy: '올해 당신은 끝까지 해낼 것입니다.\n긴 면처럼, 끊어지지 않는 당신의 의지.\n작은 한 끼가 모여 큰 성취가 됩니다.',
    position: { top: '18%', left: '12%' },
    floatDelay: '0s',
  },
  {
    id: 'chicken',
    name: '치킨',
    icon: '🍗',
    keyword: '인기',
    copy: '올해 당신의 주변은 당신으로 가득 찹니다.\n치킨처럼, 모두가 원하는 존재.\n따뜻한 만남이 당신을 기다리고 있어요.',
    position: { top: '12%', left: '68%' },
    floatDelay: '0.4s',
  },
  {
    id: 'salad',
    name: '샐러드',
    icon: '🥗',
    keyword: '건강',
    copy: '올해 당신의 몸과 마음이 빛납니다.\n신선하고 가볍게, 건강한 한 해.\n나를 돌보는 선택이 최고의 운이 됩니다.',
    position: { top: '42%', left: '8%' },
    floatDelay: '0.8s',
  },
  {
    id: 'bibimbap',
    name: '비빔밥',
    icon: '🍲',
    keyword: '계획',
    copy: '올해 당신은 모든 것을 제자리에 놓습니다.\n재료 하나하나, 완성된 그림.\n차근차근 쌓은 계획이 결실을 맺을 거예요.',
    position: { top: '38%', left: '72%' },
    floatDelay: '1.2s',
  },
  {
    id: 'pizza',
    name: '피자',
    icon: '🍕',
    keyword: '조화',
    copy: '올해 당신의 관계는 풍요롭습니다.\n여럿이 나눌수록 더 맛있는 한 해.\n함께하는 시간이 가장 큰 행복이 됩니다.',
    position: { top: '62%', left: '40%' },
    floatDelay: '1.6s',
  },
];

export const CAMPAIGN_STATS = [
  {
    title: '미혼 한부모가정',
    stat: '약 12만 가구',
    desc: '혼자 아이를 키우며 경제적·정서적 어려움을 겪는 가정이 우리 곁에 있습니다.',
  },
  {
    title: '첫 돌을 맞이하지 못한 아이',
    stat: '수천 명',
    desc: '경제적 여건으로 돌잔치를 치르지 못한 아이들이 여전히 있습니다.',
  },
  {
    title: '한 끼의 의미',
    stat: '1끼 = 희망',
    desc: '따뜻한 한 끼는 아이와 부모에게 하루를 버티는 힘이 됩니다.',
  },
];

export const CAMPAIGN_STORY =
  '"첫 돌이라는 말을 들어본 적이 없어요. 아이에게 미안하지만, 오늘도 배달 음식 한 끼로 버텼습니다. 누군가의 축하 한 마디가 큰 힘이 될 것 같아요." — 익명의 한부모 엄마';

export const COUPON_MIN_ORDER = 12000;
export const COUPON_VALID_DAYS = 7;
