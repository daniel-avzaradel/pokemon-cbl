import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Login } from './components/Login';
import { NavigationComponent } from './components/Navigation';
import { trainersData } from './components/battle/trainersData';
import { MyCards } from './components/my-cards/MyCards';
import { Shop } from './components/shop/Shop';
import { FetchedPokemon, FetchedPokemon as HookFetchedPokemon } from './hooks/usePokemon';

import styled from 'styled-components';
import Battle from './components/battle/Battle';
import Library from './components/library/Library';

import { Provider, useDispatch } from 'react-redux';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useNavigate,
} from "react-router";
import { BattleSystem } from './components/battle/BattleSystem';
import { store } from './components/library/store';
import { setUser } from './components/library/userSlice';
import { generateCardFromPokemon } from './utils/generateCardFromPokemon';


export type Card = HookFetchedPokemon;

export interface ArenaTrainersUnlock {
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
  isNPC?: boolean;
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

  const [user, setNewUser] = useState<UserData | null>();
  const dispatch = useDispatch()

  useEffect(() => {
    const savedUser = localStorage.getItem("pokemonUser");
    if (savedUser) {
      dispatch(setUser(JSON.parse(savedUser)))
    }
  }, []);


  const handleLogin = (username: string) => {
    let newUser: UserData = {
      username,
      coins: 1500,
      collection: [],
      battleDeck: [],
      arena: trainersData.map(t => ({
        name: t.name,
        unlocked: t.name === "Bug Catcher",
      })),
    };

    async function addRattata() {
      const rattata = await generateCardFromPokemon(19);
      console.log(rattata);

      newUser.collection.push(rattata);
      console.log(newUser);

      // ✅ Update state and dispatch AFTER Pokémon is added
      setNewUser(newUser);
      dispatch(setUser(newUser));
      localStorage.setItem("pokemonUser", JSON.stringify(newUser));
    }

    addRattata(); // call async function
  };

  const handleLogout = () => {
    dispatch(setUser(null));
    setNewUser(null)
    localStorage.removeItem("pokemonUser");
  };

  const updateUser = (updatedUser: UserData) => {
    setNewUser(updatedUser);
    dispatch(setUser(updatedUser));
    localStorage.setItem("pokemonUser", JSON.stringify(updatedUser));
  };

  if (!user?.username) {
    return <Login onLogin={handleLogin} />
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppContainer><NavigationComponent onLogout={handleLogout} /></AppContainer>,
      children: [
        { index: true, element: user ? <Navigate to="/library" /> : <Login onLogin={handleLogin} /> },
        { path: "library", element: <Library /> },
        { path: "my-cards", element: <MyCards updateUser={updateUser} /> },
        { path: "shop", element: <Shop updateUser={updateUser} /> },
        { path: "battle", element: <Battle updateUser={updateUser} /> },
        { path: "battle/:id", element: <BattleSystem /> },
        { path: "*", element: <Navigate to="/library" replace /> },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  );
}