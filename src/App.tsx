import { useState } from 'react';
import { useWallet } from './hooks/useWallet';
import { OnboardingScreen } from './components/onboarding/OnboardingScreen';
import { RecommendationScreen } from './components/recommendation/RecommendationScreen';
import { WalletScreen } from './components/wallet/WalletScreen';
import { BottomNav } from './components/shared/BottomNav';

type Tab = 'recommend' | 'wallet';

function MainApp() {
  const [activeTab, setActiveTab] = useState<Tab>('recommend');

  return (
    <div className="min-h-screen bg-white pb-16">
      {activeTab === 'recommend' ? <RecommendationScreen /> : <WalletScreen />}
      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  );
}

function App() {
  const { hasCards } = useWallet();

  return hasCards ? <MainApp /> : <OnboardingScreen />;
}

export default App;
