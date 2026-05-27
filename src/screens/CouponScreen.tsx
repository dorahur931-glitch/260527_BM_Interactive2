import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { trackEvent } from '../api/mockApi';
import { COUPON_MIN_ORDER, COUPON_VALID_DAYS } from '../data/foods';
import { ShareButtons } from '../components/ShareButtons';
import { useEventStatus } from '../hooks/useEventStatus';
import { copyText } from '../utils/share';
import './CouponScreen.css';

export function CouponScreen() {
  const navigate = useNavigate();
  const { status, loading } = useEventStatus();

  useEffect(() => {
    if (!loading && !status?.coupon_issued) {
      navigate('/guestbook', { replace: true });
      return;
    }
    if (status?.coupon_issued) {
      const duration = 1500;
      const end = Date.now() + duration;
      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ['#FFD600', '#0EEED3', '#FF6B6B'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ['#FFD600', '#0EEED3'],
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, [loading, status?.coupon_issued, navigate]);

  const code = status?.coupon_code ?? '';

  const handleCopy = async () => {
    await copyText(code);
    alert('쿠폰 코드가 복사되었어요!');
  };

  const handleOrder = () => {
    trackEvent('doljanchi_order_cta', {
      user_id: status?.user_id ?? '',
      coupon_code: code,
    });
    alert('배달의민족 앱에서 주문하기로 이동합니다. (데모)');
  };

  if (loading || !status?.coupon_issued) {
    return (
      <div className="coupon screen">
        <p>불러오는 중...</p>
      </div>
    );
  }

  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + COUPON_VALID_DAYS);

  return (
    <div className="coupon screen">
      <header className="coupon__header">
        <span className="coupon__emoji">🎁</span>
        <h1>쿠폰이 발급되었어요!</h1>
      </header>

      <div className="coupon__card">
        <p className="coupon__label">쿠폰 코드</p>
        <p className="coupon__code">{code}</p>
        <button type="button" className="btn-secondary coupon__copy" onClick={handleCopy}>
          복사
        </button>
      </div>

      <p className="coupon__terms">
        발급일로부터 {COUPON_VALID_DAYS}일간 유효 · {COUPON_MIN_ORDER.toLocaleString()}원 이상
        주문 시 사용 가능
      </p>
      <p className="coupon__valid">
        유효기간: ~{validUntil.toLocaleDateString('ko-KR')}
      </p>

      <button type="button" className="btn-primary coupon__order" onClick={handleOrder}>
        지금 주문하러 가기
      </button>

      <div className="coupon__share">
        <p>친구에게도 알려주세요</p>
        <ShareButtons compact />
      </div>

      <footer className="coupon__footer">
        쿠폰 사용 시 한 끼 식사 지원 기금이 미혼 한부모가정에 전달됩니다.
      </footer>

      <button type="button" className="btn-ghost" onClick={() => navigate('/select')}>
        돌잡이 처음으로
      </button>
    </div>
  );
}
