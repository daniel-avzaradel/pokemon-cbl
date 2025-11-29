import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Login } from './components/Login';
import { NavigationComponent } from './components/Navigation';
import { MyCards } from './components/my-cards/MyCards';
import { Shop } from './components/shop/Shop';
import { FetchedPokemon as HookFetchedPokemon } from './hooks/usePokemon';
import { trainersData } from './components/battle/trainersData';

import Library from './components/library/Library';
import Battle from './components/battle/Battle';
import styled from 'styled-components';

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router";
import BattleSystem from './components/battle/BattleSystem';


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
  profilePicture?: string;
}

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #0a0a0a, #000000, #0f0f0f);
  box-sizing: border-box;
`;

const MainContent = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
`;


export default function App() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("pokemonUser");
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
      arena: trainersData.map(t => ({
        name: t.name,
        unlocked: t.name === "Bug Catcher",
      })),
    };

    setUser(newUser);
    localStorage.setItem("pokemonUser", JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("pokemonUser");
  };

  const updateUser = (updatedUser: UserData) => {
    setUser(updatedUser);
    localStorage.setItem("pokemonUser", JSON.stringify(updatedUser));
  };

  if (!user) return <Login onLogin={handleLogin} />;

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AppContainer>
          <NavigationComponent user={user} onLogout={handleLogout} />
        </AppContainer>
      ),
      children: [
        { index: true, element: <Navigate to="/library" replace /> },
        { path: "library", element: <Library /> },
        {
          path: "my-cards",
          element: <MyCards user={user} updateUser={updateUser} />,
        },
        {
          path: "shop",
          element: <Shop user={user} updateUser={updateUser} />,
        },
        {
          path: "battle",
          element: <Battle user={user} updateUser={updateUser} />,
        },
        { path: "battle/:id", element: <BattleSystem user={user} /> },
        { path: "*", element: <Navigate to="/library" replace /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}