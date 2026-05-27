import { logShare } from '../api/mockApi';
import type { SharePlatform } from '../types';

const SHARE_URL = typeof window !== 'undefined' ? window.location.href : '';
const SHARE_TEXT = '내 올해 먹잡이 운명은? 배달의민족 다시하는 돌잡이 🎂';

export async function shareTo(platform: SharePlatform) {
  await logShare(platform);

  if (platform === 'link') {
    await navigator.clipboard.writeText(`${SHARE_TEXT}\n${SHARE_URL}`);
    alert('링크가 복사되었어요!');
    return;
  }

  if (navigator.share) {
    try {
      await navigator.share({
        title: '다시하는 돌잡이',
        text: SHARE_TEXT,
        url: SHARE_URL,
      });
      return;
    } catch {
      /* user cancelled */
    }
  }

  const label = platform === 'kakao' ? '카카오톡' : '인스타그램';
  alert(`${label} 공유는 앱 연동 시 사용할 수 있어요.\n링크를 복사했습니다.`);
  await navigator.clipboard.writeText(`${SHARE_TEXT}\n${SHARE_URL}`);
}

export function copyText(text: string) {
  return navigator.clipboard.writeText(text);
}
