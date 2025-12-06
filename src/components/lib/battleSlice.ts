import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card } from '../../App';

export type PlayerTurn = 'user' | 'enemy';
export interface selectedPokemonProps extends Card {
  currentStats: {
    hp: number;
    atk: number;
    def: number;
    spAtk: number;
    spDef: number;
    spd: number;
  }
}
interface BattleState {
  userPokemon: selectedPokemonProps | null;
  enemyPokemon: selectedPokemonProps | null;
  log: string[];
  turn: PlayerTurn;
  battleStarted: boolean;
}

const initialState: BattleState = {
  userPokemon: null as selectedPokemonProps | null,
  enemyPokemon: null as selectedPokemonProps | null,
  log: [],
  turn: 'user',
  battleStarted: false,
};

const battleSlice = createSlice({
  name: 'battle',
  initialState,
  reducers: {
    setUserPokemon(state, action: PayloadAction<selectedPokemonProps>) {
      state.userPokemon = action.payload;
    },
    setEnemyPokemon(state, action: PayloadAction<selectedPokemonProps>) {
      state.enemyPokemon = action.payload;
    },
    setTurn(state, action: PayloadAction<PlayerTurn>) {
      state.turn = action.payload;
    },
    addLog(state, action: PayloadAction<string>) {
      state.log.push(action.payload);
    },
    startBattle(state) {
      state.battleStarted = true;
    },
    updateUserHp(state, action: PayloadAction<number>) {
      if (state.userPokemon) state.userPokemon.currentStats.hp = action.payload;
    },
    updateEnemyHp(state, action: PayloadAction<number>) {
      if (state.enemyPokemon) state.enemyPokemon.currentStats.hp = action.payload;
    },
    resetBattle(state) {
      state.userPokemon = null;
      state.enemyPokemon = null;
      state.log = [];
      state.turn = 'user';
      state.battleStarted = false;
    },
  },
});

export const {
  setUserPokemon,
  setEnemyPokemon,
  setTurn,
  addLog,
  startBattle,
  updateUserHp,
  updateEnemyHp,
  resetBattle,
} = battleSlice.actions;

export default battleSlice.reducer;
