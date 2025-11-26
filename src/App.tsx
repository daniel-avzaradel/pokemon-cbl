import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Login } from './components/Login';
import { CardLibrary } from './components/CardLibrary';
import { Shop } from './components/Shop';
import { Battle } from './components/Battle';
import { Navigation } from './components/Navigation';

export interface Card {
  id: string;
  name: string;
  type: 'fire' | 'water' | 'grass' | 'electric' | 'psychic' | 'fighting' | 'normal';
  rarity: 'common' | 'uncommon' | 'rare' | 'ultra-rare';
  hp: number;
  attack: number;
  defense: number;
  imageUrl: string;
}

export interface UserData {
  username: string;
  coins: number;
  collection: Card[];
  battleDeck: Card[];
}

type View = 'library' | 'shop' | 'battle';

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
        {currentView === 'library' && (
          <CardLibrary user={user} updateUser={updateUser} />
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
