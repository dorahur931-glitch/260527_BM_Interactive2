import { shareTo } from '../utils/share';
import type { SharePlatform } from '../types';
import './ShareButtons.css';

const PLATFORMS: { id: SharePlatform; label: string; icon: string }[] = [
  { id: 'kakao', label: '카카오', icon: '💬' },
  { id: 'instagram', label: '인스타', icon: '📷' },
  { id: 'link', label: '링크', icon: '🔗' },
];

export function ShareButtons({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`share-buttons ${compact ? 'share-buttons--compact' : ''}`}>
      {PLATFORMS.map((p) => (
        <button
          key={p.id}
          type="button"
          className="share-buttons__item"
          onClick={() => shareTo(p.id)}
          aria-label={`${p.label}으로 공유`}
        >
          <span className="share-buttons__icon">{p.icon}</span>
          <span className="share-buttons__label">{p.label}</span>
        </button>
      ))}
    </div>
  );
}
