import { AppDispatch, RootState } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import {
    updateUserHp,
    updateEnemyHp,
    addLog,
    setTurn,
} from "./battleSlice.ts";

export type PlayerTurn = 'user' | 'enemy';
export type ActionButton = "attack" | "defense" | "special" | "return";

export function useBattleRedux() {

    const dispatch = useDispatch<AppDispatch>();
    const { userPokemon, enemyPokemon, turn, log } = useSelector((state: RootState) => state.battle);

    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    const attack = useCallback(async (attacker: PlayerTurn) => {
        if (!userPokemon || !enemyPokemon) return;

        const isUser = attacker === "user";
        const attackerPoke = isUser ? userPokemon : enemyPokemon;
        const defenderPoke = isUser ? enemyPokemon : userPokemon;

        if (attackerPoke.currentStats.hp <= 0 || defenderPoke.currentStats.hp <= 0) return;

        const minDmg = 3;
        const crit = Math.random() <= 0.2;

        const rawDmg = Math.max(attackerPoke.currentStats.atk - defenderPoke.currentStats.def, minDmg);
        const finalDmg = crit ? rawDmg * 2 : rawDmg;

        // ❗ Clamp HP to 0
        const newHp = Math.max(defenderPoke.currentStats.hp - finalDmg, 0);

        if (isUser) {
            dispatch(updateEnemyHp(newHp));
        } else {
            dispatch(updateUserHp(newHp));
        }

        dispatch(addLog(
            `${capitalize(attackerPoke.name)} attacks for ${finalDmg}${crit ? " (critical!)" : ""} damage!`
        ));

        await delay(500);

        return newHp === 0;
    }, [userPokemon, enemyPokemon, dispatch]);

    const handleTurn = useCallback(async (action: ActionButton) => {
        if (!userPokemon || !enemyPokemon) return;

        if (userPokemon.currentStats.hp <= 0 || enemyPokemon.currentStats.hp <= 0) return;

        if (action === "attack") {
            const fainted = await attack(turn);
            if (fainted) return;
        }

        const nextTurn: PlayerTurn = turn === "user" ? "enemy" : "user";
        dispatch(setTurn(nextTurn));

        if (turn === "user" && nextTurn === "enemy") {
            if (enemyPokemon.currentStats.hp <= 0) return;

            await delay(500);
            const fainted = await attack("enemy");
            if (fainted) return;
            dispatch(setTurn("user"));
        }
    }, [turn, attack, userPokemon, enemyPokemon, dispatch]);

    useEffect(() => {
        if (userPokemon?.currentStats.hp! <= 0) {
            console.log('dead', userPokemon);

        }
    }, [userPokemon])

    useEffect(() => {
        if (enemyPokemon?.currentStats.hp! <= 0) {
            console.log('dead', enemyPokemon);

        }
    }, [enemyPokemon])

    return {
        userPokemon,
        enemyPokemon,
        turnState: turn,
        log,
        handleTurn,
    };
}
