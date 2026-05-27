import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SplashScreen } from './screens/SplashScreen';
import { SelectScreen } from './screens/SelectScreen';
import { ResultScreen } from './screens/ResultScreen';
import { GuestbookScreen } from './screens/GuestbookScreen';
import { CouponScreen } from './screens/CouponScreen';
import { resetAllProgress } from './api/mockApi';

function DevResetBar() {
  if (!import.meta.env.DEV) return null;
  return (
    <button
      type="button"
      style={{
        position: 'fixed',
        bottom: 8,
        right: 8,
        zIndex: 9999,
        fontSize: 10,
        padding: '4px 8px',
        background: '#333',
        color: '#fff',
        borderRadius: 4,
        opacity: 0.6,
      }}
      onClick={() => {
        resetAllProgress();
        window.location.href = '/';
      }}
    >
      초기화
    </button>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/select" element={<SelectScreen />} />
        <Route path="/result/:foodId" element={<ResultScreen />} />
        <Route path="/guestbook" element={<GuestbookScreen />} />
        <Route path="/coupon" element={<CouponScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <DevResetBar />
    </BrowserRouter>
  );
}
