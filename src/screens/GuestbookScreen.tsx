import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGuestbook, issueCoupon, postGuestbook } from '../api/mockApi';
import { useEventStatus } from '../hooks/useEventStatus';
import type { GuestbookEntry } from '../types';
import './GuestbookScreen.css';

const MIN_MSG = 10;
const MAX_MSG = 100;
const MAX_NICK = 10;

export function GuestbookScreen() {
  const navigate = useNavigate();
  const { status, setStatus } = useEventStatus();
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [page, setPage] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const alreadyDone = status?.guestbook_done || status?.coupon_issued;

  useEffect(() => {
    getGuestbook(page, 10).then(setEntries);
  }, [page]);

  useEffect(() => {
    if (status?.coupon_issued) {
      navigate('/coupon', { replace: true });
    }
  }, [status?.coupon_issued, navigate]);

  const msgLen = message.length;
  const validMsg = msgLen >= MIN_MSG && msgLen <= MAX_MSG;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validMsg || alreadyDone) return;
    setError('');
    setSubmitting(true);
    try {
      await postGuestbook(nickname.slice(0, MAX_NICK), message);
      const updated = await issueCoupon();
      setStatus(updated);
      navigate('/coupon');
    } catch (err) {
      setError(err instanceof Error ? err.message : '제출에 실패했어요.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="guestbook screen">
      <header className="guestbook__header">
        <h1>🎉 첫 돌을 축하해요!</h1>
        <p>방명록에 한 마디 남겨주세요</p>
      </header>

      {alreadyDone ? (
        <div className="guestbook__done">
          <p>이미 참여하셨어요 🎁</p>
          <button type="button" className="btn-primary" onClick={() => navigate('/coupon')}>
            내 쿠폰 보기
          </button>
        </div>
      ) : (
        <form className="guestbook__form" onSubmit={handleSubmit}>
          <label className="guestbook__label">
            닉네임 (선택)
            <input
              type="text"
              maxLength={MAX_NICK}
              placeholder="미입력 시 익명"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </label>
          <label className="guestbook__label">
            축하 메시지
            <textarea
              rows={4}
              maxLength={MAX_MSG}
              placeholder={`${MIN_MSG}자 이상 작성해 주세요`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <span className={`guestbook__counter ${validMsg ? 'guestbook__counter--ok' : ''}`}>
              {msgLen} / {MAX_MSG}
            </span>
          </label>
          {error && <p className="guestbook__error">{error}</p>}
          <button
            type="submit"
            className="btn-primary"
            disabled={!validMsg || submitting}
          >
            {submitting ? '제출 중...' : '축하 남기고 쿠폰 받기'}
          </button>
        </form>
      )}

      <section className="guestbook__timeline">
        <h2>방명록</h2>
        <ul>
          {entries.map((entry) => (
            <li key={entry.entry_id} className="guestbook__entry">
              <strong>{entry.nickname}</strong>
              <p>{entry.message}</p>
              <time dateTime={entry.created_at}>
                {new Date(entry.created_at).toLocaleDateString('ko-KR')}
              </time>
            </li>
          ))}
        </ul>
        {entries.length >= page * 10 && (
          <button
            type="button"
            className="btn-ghost guestbook__more"
            onClick={() => setPage((p) => p + 1)}
          >
            더보기
          </button>
        )}
      </section>

      <button type="button" className="btn-ghost" onClick={() => navigate(-1)}>
        ← 돌아가기
      </button>
    </div>
  );
}
