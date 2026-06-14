import { useState, useEffect } from 'react';
import './index.css';
import SplashScreen from './components/SplashScreen';
import OnboardingScreen from './components/OnboardingScreen';
import LoginScreen from './components/LoginScreen';
import ModernHome from './components/ModernHome';

type Screen = 'splash' | 'onboarding' | 'login' | 'home';

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');

  useEffect(() => {
    if (screen === 'splash') {
      const t = setTimeout(() => setScreen('onboarding'), 2200);
      return () => clearTimeout(t);
    }
  }, [screen]);

  if (screen === 'splash')     return <SplashScreen />;
  if (screen === 'onboarding') return <OnboardingScreen onStart={() => setScreen('login')} />;
  if (screen === 'login')      return <LoginScreen onLogin={() => setScreen('home')} />;
  return <ModernHome />;
}
