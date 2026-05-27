import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { resetSelection, trackEvent } from '../api/mockApi';
import { FOODS, CAMPAIGN_STATS, CAMPAIGN_STORY } from '../data/foods';
import { ShareButtons } from '../components/ShareButtons';
import { useEventStatus } from '../hooks/useEventStatus';
import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll';
import type { FoodId } from '../types';
import './ResultScreen.css';

export function ResultScreen() {
  const { foodId } = useParams<{ foodId: string }>();
  const navigate = useNavigate();
  const { status, setStatus } = useEventStatus();
  const campaignRef = useRef<HTMLDivElement>(null);
  const { ref: cardRef, visible: cardVisible } = useFadeInOnScroll<HTMLDivElement>();
  const { ref: statRef, visible: statVisible } = useFadeInOnScroll<HTMLDivElement>();

  const food = FOODS.find((f) => f.id === foodId);

  useEffect(() => {
    if (food) {
      trackEvent('doljanchi_result_view', {
        user_id: status?.user_id ?? '',
        food_id: food.id,
      });
    }
  }, [food, status?.user_id]);

  useEffect(() => {
    const el = campaignRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackEvent('doljanchi_campaign_scroll', {
            user_id: status?.user_id ?? '',
            scroll_depth: 50,
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [status?.user_id]);

  if (!food || !FOODS.some((f) => f.id === foodId)) {
    return (
      <div className="screen">
        <p>잘못된 접근이에요.</p>
        <button type="button" className="btn-primary" onClick={() => navigate('/select')}>
          돌잡이 하러 가기
        </button>
      </div>
    );
  }

  const handleRetry = async () => {
    if (status?.retry_used) return;
    try {
      const updated = await resetSelection();
      setStatus(updated);
      navigate('/select');
    } catch {
      /* already used */
    }
  };

  const canRetry = status && !status.retry_used;

  return (
    <div className="result screen">
      <div
        ref={cardRef}
        className={`result__card fade-in-up ${cardVisible ? 'visible' : ''}`}
      >
        <span className="result__icon">{food.icon}</span>
        <h2 className="result__food-name">{food.name}</h2>
        <span className="result__badge"># {food.keyword}</span>
        <h3 className="result__headline">남은 올해 당신이 이루게 될 한 가지</h3>
        <p className="result__copy">
          {food.copy.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < food.copy.split('\n').length - 1 && <br />}
            </span>
          ))}
        </p>
        <ShareButtons />
        {canRetry && (
          <button type="button" className="btn-ghost result__retry" onClick={handleRetry}>
            다시 뽑기 (1회)
          </button>
        )}
        {status?.retry_used && (
          <p className="result__retry-done">다시 뽑기를 이미 사용하셨어요</p>
        )}
      </div>

      <div ref={campaignRef} className="result__campaign">
        <div className="result__divider" />
        <p className="result__bridge">그런데, 돌을 맞이하지 못한 아이들이 있어요.</p>

        <div
          ref={statRef}
          className={`result__stats fade-in-up ${statVisible ? 'visible' : ''}`}
        >
          {CAMPAIGN_STATS.map((card, i) => (
            <article key={i} className="result__stat-card">
              <h4>{card.title}</h4>
              <p className="result__stat-num">{card.stat}</p>
              <p className="result__stat-desc">{card.desc}</p>
            </article>
          ))}
        </div>

        <blockquote className="result__story">{CAMPAIGN_STORY}</blockquote>

        <button
          type="button"
          className="btn-primary result__guestbook-cta"
          onClick={() => navigate('/guestbook')}
        >
          첫 돌을 맞이하는 아이들에게 축하를 전해주세요
        </button>
      </div>
    </div>
  );
}
