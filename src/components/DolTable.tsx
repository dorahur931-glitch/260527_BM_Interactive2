import { FOODS } from '../data/foods';
import type { FoodId } from '../types';
import './DolTable.css';

interface DolTableProps {
  onSelect?: (id: FoodId) => void;
  selectingId?: FoodId | null;
  disabled?: boolean;
  showItems?: boolean;
}

export function DolTable({
  onSelect,
  selectingId,
  disabled,
  showItems = true,
}: DolTableProps) {
  return (
    <div className="dol-table">
      <div className="dol-table__stage">
        <div className="dol-table__cloth" aria-hidden />
        <div className="dol-table__table" aria-hidden>
          <span className="dol-table__character" aria-hidden>
            🐰
          </span>
        </div>
        {showItems &&
          FOODS.map((food) => (
            <button
              key={food.id}
              type="button"
              className={`dol-table__food ${selectingId === food.id ? 'dol-table__food--pop' : ''}`}
              style={{
                top: food.position.top,
                left: food.position.left,
                animationDelay: food.floatDelay,
              }}
              disabled={disabled || !!selectingId}
              onClick={() => onSelect?.(food.id)}
              aria-label={`${food.name} 선택`}
            >
              <span className="dol-table__food-icon">{food.icon}</span>
            </button>
          ))}
      </div>
    </div>
  );
}
