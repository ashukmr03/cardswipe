type Tab = 'recommend' | 'wallet';

interface BottomNavProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-100 bg-white" style={{ maxWidth: 480, margin: '0 auto', left: '50%', transform: 'translateX(-50%)', width: '100%' }}>
      <div className="flex">
        <button
          className={`flex-1 flex flex-col items-center py-3 gap-0.5 text-xs font-medium transition-colors ${
            active === 'recommend' ? 'text-blue-600' : 'text-gray-400'
          }`}
          onClick={() => onChange('recommend')}
        >
          <span className="text-lg">💳</span>
          Recommend
        </button>
        <button
          className={`flex-1 flex flex-col items-center py-3 gap-0.5 text-xs font-medium transition-colors ${
            active === 'wallet' ? 'text-blue-600' : 'text-gray-400'
          }`}
          onClick={() => onChange('wallet')}
        >
          <span className="text-lg">👛</span>
          Wallet
        </button>
      </div>
    </nav>
  );
}
