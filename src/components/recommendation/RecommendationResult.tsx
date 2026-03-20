import type { RecommendationResult as Result } from '../../types';

interface RecommendationResultProps {
  result: Result;
}

function CardBadge({ name, bank, rate, highlight }: { name: string; bank: string; rate: number; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl border p-4 ${highlight ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`font-semibold text-sm ${highlight ? 'text-blue-800' : 'text-gray-700'}`}>{name}</p>
          <p className="text-xs text-gray-400">{bank}</p>
        </div>
        <span className={`text-2xl font-bold ${highlight ? 'text-blue-600' : 'text-gray-500'}`}>
          {rate}%
        </span>
      </div>
    </div>
  );
}

export function RecommendationResult({ result }: RecommendationResultProps) {
  const { bestCard, rewardRate, reason, isTie, tiedCard, tieBreakReason, isNoMatch, suggestion } = result;

  return (
    <div className="mt-6 space-y-3">
      {/* No-match banner */}
      {isNoMatch && (
        <div className="rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3">
          <p className="text-amber-700 text-sm font-medium">No special rewards for this category</p>
          {suggestion && <p className="text-amber-600 text-xs mt-1">{suggestion}</p>}
        </div>
      )}

      {/* Best card */}
      <div>
        {!isNoMatch && (
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Best card</p>
        )}
        {isNoMatch && (
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Use this anyway</p>
        )}
        <CardBadge
          name={bestCard.name}
          bank={bestCard.bank}
          rate={rewardRate}
          highlight={!isNoMatch}
        />
      </div>

      {/* Reason */}
      <p className="text-sm text-gray-500 px-1">{reason}</p>

      {/* Tie-break reason */}
      {tieBreakReason && (
        <p className="text-xs text-blue-500 px-1">{tieBreakReason}</p>
      )}

      {/* Tied card */}
      {isTie && tiedCard && (
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Also good</p>
          <CardBadge
            name={tiedCard.name}
            bank={tiedCard.bank}
            rate={rewardRate}
          />
        </div>
      )}
    </div>
  );
}
