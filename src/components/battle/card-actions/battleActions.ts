import { useState, useCallback, useEffect, useRef } from "react";
import { selectedPokemonProps } from "../BattleSystem";

export type actionButton = "attack" | "defense" | "special" | "return";
export type playerTurn = 'user' | 'enemy';
export type speedCountType = {
    defender: playerTurn,
    count: number
}

function useSyncedRefState<T>(initial: T) {
    const ref = useRef<T>(initial);
    const [state, setState] = useState<T>(initial);

    const setBoth = useCallback((value: T) => {
        ref.current = value;  // instant update for logic
        setState(value);      // UI re-render
    }, []);

    return [state, ref, setBoth] as const;
}

export function useBattle(userCard: selectedPokemonProps, enemyCard: selectedPokemonProps) {
    const [log, setLog] = useState<string[]>([]);
    const [firstTurn, setFirstTurn] = useState(true);

    const [userPokemon, setUserPokemon] = useState<selectedPokemonProps>({ ...userCard });
    const [enemyPokemon, setEnemyPokemon] = useState<selectedPokemonProps>({ ...enemyCard });

    const faintedRef = useRef<selectedPokemonProps>({ ...userCard })

    // --- REPLACED turnRef with synced-ref-state ---
    const [turnState, turnRef, setTurn] =
        useSyncedRefState<playerTurn>("user");

    // --- REPLACED speedRef with synced-ref-state ---
    const [speedState, speedRef, setSpeed] =
        useSyncedRefState<speedCountType>({
            count: 0,
            defender: "user"
        });

    // set initial speed immediately
    useEffect(() => {
        const initial = {
            count: Math.abs(userPokemon.currentStats.spd - enemyPokemon.currentStats.spd),
            defender: (userPokemon.currentStats.spd >= enemyPokemon.currentStats.spd ? "enemy" : "user") as playerTurn
        };
        setSpeed(initial);
    }, []);

    const started = useRef(false);

    const delay = useCallback((ms: number) => new Promise(res => setTimeout(res, ms)), []);

    const capitalize = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);
    const userName = capitalize(userPokemon.name);
    const enemyName = capitalize(enemyPokemon.name);

    // -------------------------------------------------
    // Check for fainted
    // -------------------------------------------------
    const checkFaint = useCallback(async (pokemon: selectedPokemonProps, attacker: playerTurn, hp: number) => {
        if (hp > 0) return false;

        if (pokemon === userPokemon) {
            setUserPokemon(prev => ({ ...prev, currentStats: { ...prev.currentStats, hp: 0 } }));
            faintedRef.current = { ...userPokemon, currentStats: { ...userPokemon.currentStats, hp: 0 } };
        } else {
            setEnemyPokemon(prev => ({ ...prev, currentStats: { ...prev.currentStats, hp: 0 } }));
            faintedRef.current = { ...enemyPokemon, currentStats: { ...enemyPokemon.currentStats, hp: 0 } };
        }
        await delay(2000)
        setLog(prev => [...prev, `${pokemon.name} has fainted...`]);
        return true;
    }, [userPokemon, enemyPokemon]);

    // -------------------------------------------------
    // Executes a single attack
    // -------------------------------------------------
    const attack = useCallback(
        (attacker: playerTurn) => {
            const crit = Math.random() <= 0.2;
            const minDmg = 3;

            if (attacker === "user") {
                const dmg = Math.max(userPokemon.currentStats.atk - enemyPokemon.currentStats.def, minDmg);
                setEnemyPokemon(prev => ({
                    ...prev,
                    currentStats: { ...prev.currentStats, hp: prev.currentStats.hp - (crit ? dmg * 2 : dmg) }
                }));
                setLog(prev => [...prev, `${userName} attacks for ${crit ? dmg * 2 + " critical" : dmg} damage!`]);
                let faintHp = enemyPokemon.currentStats.hp - (crit ? dmg * 2 : dmg)
                checkFaint(enemyPokemon, attacker, faintHp)
            } else {
                const dmg = Math.max(enemyPokemon.currentStats.atk - userPokemon.currentStats.def, minDmg);
                setUserPokemon(prev => ({
                    ...prev,
                    currentStats: { ...prev.currentStats, hp: prev.currentStats.hp - (crit ? dmg * 2 : dmg) }
                }));
                setLog(prev => [...prev, `${enemyName} attacks for ${crit ? dmg * 2 + " critical" : dmg} damage!`]);
                let faintHp = userPokemon.currentStats.hp - (crit ? dmg * 2 : dmg)
                checkFaint(userPokemon, attacker, faintHp)
            }
        },
        [userPokemon, enemyPokemon, userName, enemyName]
    );

    // -------------------------------------------------
    // Resolve turns automatically until it’s the player’s turn
    // -------------------------------------------------
    const resolveTurns = useCallback(async () => {
        if (faintedRef.current.currentStats.hp === 0) {
            console.log('FAINTED!!');
            return
        }
        setFirstTurn(false);
        if (turnRef.current === "user") return;
        await handleTurn("attack");
    }, [attack, firstTurn, userPokemon, delay, faintedRef]);

    // -------------------------------------------------
    // Your same logic for getting next attacker
    // -------------------------------------------------
    const getNextAttacker = (speedCount: speedCountType) => {
        let next: playerTurn = speedCount.defender
        if (firstTurn) {
            if (turnRef.current === "enemy") {
                setTurn("user");
                turnRef.current = 'user'
            } else {
                setTurn("enemy");
                turnRef.current = "enemy"
            }
            next = turnRef.current
            return next
        }

        let newCount = speedCount.defender === 'enemy' ? userPokemon.currentStats.spd - Math.abs(speedCount.count) : enemyPokemon.currentStats.spd - Math.abs(speedCount.count);

        speedCount.count = newCount;
        setSpeed({
            count: newCount,
            defender: "enemy"
        });

        next = speedCount.defender === "user" ? speedCount.count >= userPokemon.currentStats.spd ? "enemy" : "user"
            : speedCount.defender === "enemy" && speedCount.count >= enemyPokemon.currentStats.spd ? "user" : "enemy";
        setTurn(next); // <-- now uses synced-ref-state
        return next;
    };

    // -------------------------------------------------
    // Player action (button click)
    // -------------------------------------------------
    const handleTurn = useCallback(
        async (action: actionButton) => {
            turnRef.current === "user" ? speedRef.current.defender = "enemy" : speedRef.current.defender = "user"
            setTurn(turnRef.current);

            if (action === "attack") {
                if (turnRef.current === "enemy") await delay(3000);
                attack(turnRef.current);
            }

            // update next attacker
            if (turnRef.current === "enemy") await delay(2000);
            getNextAttacker(speedRef.current);

            // auto-resolve
            await resolveTurns();
        },
        [attack, resolveTurns]
    );

    // -------------------------------------------------
    // Battle start
    // -------------------------------------------------
    const battleStart = useCallback(async () => {
        if (started.current) return;
        started.current = true;

        setLog(prev => [...prev, "Battle started!"]);

        const startingTurn: playerTurn =
            speedRef.current.defender === "enemy" ? "user" : "enemy";

        setTurn(startingTurn);

        if (startingTurn === "enemy") {
            setFirstTurn(true);
            await resolveTurns();
        }
    }, [userPokemon, enemyPokemon]);

    useEffect(() => {
        battleStart();
    }, [battleStart]);

    return {
        log,
        turnState,
        speedState,
        userPokemon,
        enemyPokemon,
        handleTurn
    };
}