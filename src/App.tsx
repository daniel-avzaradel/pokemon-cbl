import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import { Login } from './components/Login';
import { Navigation } from './components/Navigation';
import Battle from './components/battle/Battle';
import Library from './components/library/Library';
import { MyCards } from './components/my-cards/MyCards';
import { Shop } from './components/shop/Shop';
import { FetchedPokemon as HookFetchedPokemon } from './hooks/usePokemon';
import { trainersData } from './components/battle/trainersData';

export type Card = HookFetchedPokemon;

interface ArenaTrainersUnlock {
  name: string;
  unlocked: boolean;
}

export interface UserData {
  username: string;
  coins: number;
  collection: Card[];
  battleDeck: Card[];
  arena: ArenaTrainersUnlock[]
}

type View = 'library' | 'myCards' | 'shop' | 'battle';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #0a0a0a, #000000, #0f0f0f);
`;

const MainContent = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
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
      coins: 20000,
      collection: [],
      battleDeck: [],
      arena: trainersData.map(t => {
        return {
          name: t.name,
          unlocked: t.name === 'Bug Catcher' ? true : false
        }
      })
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
          <Library />)}
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
      <ToastContainer position="top-right" autoClose={3000} />
    </AppContainer>
  );
}
