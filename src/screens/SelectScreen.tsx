import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { selectFood } from '../api/mockApi';
import { DolTable } from '../components/DolTable';
import { useEventStatus } from '../hooks/useEventStatus';
import type { FoodId } from '../types';
import './SelectScreen.css';

export function SelectScreen() {
  const navigate = useNavigate();
  const { status, loading, setStatus } = useEventStatus();
  const [selectingId, setSelectingId] = useState<FoodId | null>(null);

  useEffect(() => {
    if (!loading && status?.food_selected && !selectingId) {
      navigate(`/result/${status.food_selected}`, { replace: true });
    }
  }, [loading, status, navigate, selectingId]);

  const handleSelect = async (foodId: FoodId) => {
    if (status?.food_selected) return;
    setSelectingId(foodId);
    try {
      const updated = await selectFood(foodId);
      setStatus(updated);
      setTimeout(() => navigate(`/result/${foodId}`), 300);
    } catch {
      setSelectingId(null);
    }
  };

  if (loading) {
    return (
      <div className="select screen">
        <p className="select__loading">불러오는 중...</p>
      </div>
    );
  }

  const alreadySelected = !!status?.food_selected;

  return (
    <div className="select screen">
      <header className="select__header">
        <h1 className="select__title">내 올해 먹잡이 운명은?</h1>
        <p className="select__desc">돌상 위 음식을 골라 올해의 키워드를 받아보세요</p>
      </header>

      <DolTable
        onSelect={handleSelect}
        selectingId={selectingId}
        disabled={alreadySelected}
        showItems={!alreadySelected}
      />

      <p className="select__cta">지금 골라봐! 남은 올해의 운명은?</p>

      {alreadySelected && (
        <button
          type="button"
          className="btn-primary select__view-result"
          onClick={() => navigate(`/result/${status!.food_selected}`)}
        >
          내 결과 다시 보기
        </button>
      )}
    </div>
  );
}
