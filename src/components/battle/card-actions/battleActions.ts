import { useState, useCallback, useEffect, useRef } from "react";
import { selectedPokemonProps } from "../BattleSystem";

export type actionButton = "attack" | "defense" | "special" | "return";
export type playerTurn = 'user' | 'enemy';

export function useBattle(userCard: selectedPokemonProps, enemyCard: selectedPokemonProps) {
    const [log, setLog] = useState<string[]>([]);
    const [playerTurn, setPlayerTurn] = useState<playerTurn>("user");
    const [speedCount, setSpeedCount] = useState(0);
    const [firstTurn, setFirstTurn] = useState(true);

    const [userPokemon, setUserPokemon] = useState<selectedPokemonProps>({ ...userCard });
    const [enemyPokemon, setEnemyPokemon] = useState<selectedPokemonProps>({ ...enemyCard });

    const started = useRef(false);

    const delay = useCallback((ms: number) => new Promise(res => setTimeout(res, ms)), []);

    // Pure function: determines whose turn it is based on a local speed
    const getNextTurn = useCallback((localSpeed: number): playerTurn => {
        if (localSpeed === 0) {
            return userPokemon.currentStats.spd >= enemyPokemon.currentStats.spd ? "user" : "enemy";
        }
        if (localSpeed > 0) {
            return localSpeed >= enemyPokemon.currentStats.spd ? "user" : "enemy";
        }
        return Math.abs(localSpeed) >= userPokemon.currentStats.spd ? "enemy" : "user";
    }, [userPokemon, enemyPokemon]);

    // Executes a single attack
    const attack = useCallback((attacker: playerTurn) => {
        if (attacker === "user") {
            const dmg = Math.max(userPokemon.currentStats.atk - enemyPokemon.currentStats.def, 2);
            setEnemyPokemon(prev => ({
                ...prev,
                currentStats: { ...prev.currentStats, hp: prev.currentStats.hp - dmg }
            }));
            setLog(prev => [...prev, `${userPokemon.name} attacks for ${dmg} damage!`]);
            return dmg;
        } else {
            const dmg = Math.max(enemyPokemon.currentStats.atk - userPokemon.currentStats.def, 2);
            setUserPokemon(prev => ({
                ...prev,
                currentStats: { ...prev.currentStats, hp: prev.currentStats.hp - dmg }
            }));
            setLog(prev => [...prev, `${enemyPokemon.name} attacks for ${dmg} damage!`]);
            return dmg;
        }
    }, [userPokemon, enemyPokemon]);

    // Automatic enemy turns
    const enemyAutoTurn = useCallback(async (localSpeed: number) => {
        while (getNextTurn(localSpeed) === "enemy") {
            const enemyDelay = firstTurn ? 3500 : 2500; // 5s first turn, 1s otherwise
            await delay(enemyDelay);

            attack("enemy");
            localSpeed += userPokemon.currentStats.spd;
            setFirstTurn(false);
        }

        setSpeedCount(localSpeed);
        setPlayerTurn("user");
    }, [getNextTurn, attack, firstTurn, userPokemon, delay]);

    // Player action (button click)
    const handleTurn = useCallback(async (action: actionButton) => {
        if (playerTurn !== "user") return;

        let localSpeed = speedCount;

        if (action === "attack") {
            attack("user");
            localSpeed -= enemyPokemon.currentStats.spd;
        }

        // Resolve enemy turns automatically after player action
        await enemyAutoTurn(localSpeed);
    }, [playerTurn, speedCount, attack, enemyPokemon, enemyAutoTurn]);

    // Battle start, runs only once
    const battleStart = useCallback(async () => {
        if (started.current) return;
        started.current = true;

        setLog(prev => [...prev, "Battle started!"]);

        // Local copies to avoid render/stale issues
        let localSpeed = userPokemon.currentStats.spd - enemyPokemon.currentStats.spd;
        let localUserHP = userPokemon.currentStats.hp;
        
        const startingTurn: playerTurn = localSpeed >= 0 ? "user" : "enemy";
        setPlayerTurn(startingTurn);

        if (startingTurn === "enemy") {
            setFirstTurn(true);

            // wait 5s for loading
            await delay(3000);

            // Enemy attacks using local variables
            while (true) {
                const nextAttacker = localSpeed >= 0 ? "user" : "enemy";
                if (nextAttacker === "user") break; // stop loop when it’s player’s turn

                // enemy attacks
                const dmg = Math.max(enemyPokemon.currentStats.atk - userPokemon.currentStats.def, 2);
                const crit = (Math.random() * 100) <= 99;
                localUserHP -= dmg;
                setUserPokemon(prev => ({
                    ...prev,
                    currentStats: { ...prev.currentStats, hp: localUserHP }
                }));
                setLog(prev => [...prev, `${enemyPokemon.name} attacks for ${crit ? (dmg * 2) + ' critical' : dmg} damage!`]);

                await delay(1000);

                // update local speed
                localSpeed = enemyPokemon.currentStats.spd - userPokemon.currentStats.spd + localSpeed;
            }

            setSpeedCount(localSpeed);
            setPlayerTurn("user");
            setFirstTurn(false);
        }
    }, [userPokemon, enemyPokemon, delay]);

    useEffect(() => {
        battleStart();
    }, [battleStart]);

    useEffect(() => {
        console.log(playerTurn);
    }, [playerTurn])

    return {
        log,
        playerTurn,
        speedCount,
        userPokemon,
        enemyPokemon,
        handleTurn
    };
}
