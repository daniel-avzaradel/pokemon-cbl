import { AppDispatch, RootState } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
    updateUserHp,
    updateEnemyHp,
    addLog,
    setTurn,
} from "./battleSlice.ts";

export type PlayerTurn = 'user' | 'enemy';
export type ActionButton = "attack" | "defense" | "special" | "return";

// Custom hook to replace useBattle
export function useBattleRedux() {
    
    const dispatch = useDispatch<AppDispatch>();
    const { userPokemon, enemyPokemon, turn, log } = useSelector((state: RootState) => state.battle);

    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    const attack = useCallback(async (attacker: PlayerTurn) => {
        if (!userPokemon || !enemyPokemon) return;

        const crit = Math.random() <= 0.2;
        const minDmg = 3;

        if (attacker === "user") {
            const dmg = Math.max(userPokemon.currentStats.atk - enemyPokemon.currentStats.def, minDmg);
            dispatch(updateEnemyHp(enemyPokemon.currentStats.hp - (crit ? dmg * 2 : dmg)));
            dispatch(addLog(`${capitalize(userPokemon.name)} attacks for ${crit ? dmg * 2 + " critical" : dmg} damage!`));
        } else {
            const dmg = Math.max(enemyPokemon.currentStats.atk - userPokemon.currentStats.def, minDmg);
            dispatch(updateUserHp(userPokemon.currentStats.hp - (crit ? dmg * 2 : dmg)));
            dispatch(addLog(`${capitalize(enemyPokemon.name)} attacks for ${crit ? dmg * 2 + " critical" : dmg} damage!`));
        }

        await delay(500);
    }, [userPokemon, enemyPokemon, dispatch]);

    const handleTurn = useCallback(async (action: ActionButton) => {
        if (!userPokemon || !enemyPokemon) return;

        if (action === "attack") {
            await attack(turn);
        }

        // Switch turn
        const nextTurn: PlayerTurn = turn === "user" ? "enemy" : "user";
        dispatch(setTurn(nextTurn));

        // Auto-resolve enemy turn if needed
        if (turn === "user" && nextTurn === "enemy") {
            await delay(500);
            await attack("enemy");
            dispatch(setTurn("user"));
        }
    }, [turn, attack, userPokemon, enemyPokemon, dispatch]);

    return {
        userPokemon,
        enemyPokemon,
        turnState: turn,
        log,
        handleTurn,
    };
}
