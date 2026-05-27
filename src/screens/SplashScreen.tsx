import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { trackEvent } from '../api/mockApi';
import './SplashScreen.css';

export function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    trackEvent('doljanchi_popup_view', { entry_point: 'direct' });
    const timer = setTimeout(() => navigate('/select', { replace: true }), 500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash screen">
      <div className="splash__logo">배달의민족</div>
      <div className="splash__dol">
        <div className="splash__table-anim">🎂</div>
        <p className="splash__title">다시하는 돌잡이</p>
      </div>
      <p className="splash__subtitle">내 올해 먹잡이 운명은?</p>
    </div>
  );
}
