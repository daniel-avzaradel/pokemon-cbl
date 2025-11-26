import { useState, useEffect } from 'react';
import { FetchedPokemon as HookFetchedPokemon } from './hooks/usePokemon';
import styled from 'styled-components';
import { Login } from './components/Login';
import { Shop } from './components/shop/Shop';
import { Battle } from './components/battle/Battle';
import { Navigation } from './components/Navigation';
import { MyCards } from './components/my-cards/MyCards';

export type Card = HookFetchedPokemon;

export interface UserData {
  username: string;
  coins: number;
  collection: Card[];
  battleDeck: Card[];
}

type View = 'library' | 'myCards' | 'shop' | 'battle';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #0a0a0a, #000000, #0f0f0f);
`;

const MainContent = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export default function App() {
  const [user, setUser] = useState<UserData | null>(null);
  const [currentView, setCurrentView] = useState<View>('library');

  useEffect(() => {
    const savedUser = localStorage.getItem('pokemonUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (username: string) => {
    const newUser: UserData = {
      username,
      coins: 1000,
      collection: [],
      battleDeck: []
    };
    setUser(newUser);
    localStorage.setItem('pokemonUser', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('pokemonUser');
  };

  const updateUser = (updatedUser: UserData) => {
    setUser(updatedUser);
    localStorage.setItem('pokemonUser', JSON.stringify(updatedUser));
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <AppContainer>
      <Navigation 
        user={user}
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={handleLogout}
      />
      
      <MainContent>
        {currentView === 'myCards' && (
          <MyCards user={user} updateUser={updateUser} />
        )}
        {currentView === 'shop' && (
          <Shop user={user} updateUser={updateUser} />
        )}
        {currentView === 'battle' && (
          <Battle user={user} updateUser={updateUser} />
        )}
      </MainContent>
    </AppContainer>
  );
}
