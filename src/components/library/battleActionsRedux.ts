import { useEffect, useState, useCallback, useRef } from "react";
import { Card, UserData } from "../../App";
import { capitalize } from "../common/utils";

export type TurnState =
    | "idle"
    | "user-turn"
    | "enemy-turn"
    | "resolving"
    | "finished";

export function useBattleRedux(userTrainer: UserData, enemyTrainer: UserData) {
  const [userPokemon, setUserPokemon] = useState<Card | null>(null);
  const [enemyPokemon, setEnemyPokemon] = useState<Card | null>(null);

  const [turnState, setTurnState] = useState<TurnState>("idle");
  const [log, setLog] = useState<string[]>([]);

  // -----------------------------
  // Coin toss overlay control
  // -----------------------------
  const [showCoinOverlay, setShowCoinOverlay] = useState(false);

  // Logging queue
  const logQueue = useRef<string[]>([]);
  const isLogging = useRef(false);

  // -----------------------------
  // Logging function
  // -----------------------------
  const pushLog = useCallback((text: string) => {
    logQueue.current.push(text);

    if (!isLogging.current) {
      isLogging.current = true;
      processLogQueue();
    }
  }, []);

  const processLogQueue = useCallback(() => {
    if (logQueue.current.length === 0) {
      isLogging.current = false;
      return;
    }

    const next = logQueue.current.shift()!;
    setLog(prev => [...prev, next]);
    setTimeout(processLogQueue, 600);
  }, []);

  // -----------------------------
  // Initialize battle
  // -----------------------------
  useEffect(() => {
    if (!userTrainer || !enemyTrainer) return;

    const u = userTrainer.battleDeck[0];
    const e = enemyTrainer.battleDeck[0];

    if (!u || !e) return;

    // initialize currentStats
    setUserPokemon({
      ...u,
      currentStats: {
        hp: u.stats.hp,
        atk: u.stats.attack,
        def: u.stats.defense,
        spAtk: u.stats.specialAttack,
        spDef: u.stats.specialDefense,
        spd: u.stats.speed
      }
    });

    setEnemyPokemon({
      ...e,
      currentStats: {
        hp: e.stats.hp,
        atk: e.stats.attack,
        def: e.stats.defense,
        spAtk: e.stats.specialAttack,
        spDef: e.stats.specialDefense,
        spd: e.stats.speed
      }
    });

    pushLog("The battle begins!");
    pushLog(`${userTrainer.username} sends out ${u.name}!`);
    pushLog(`${enemyTrainer.username} sends out ${e.name}!`);

    // -----------------------------
    // Decide who goes first
    // -----------------------------
    if (u.stats.speed === e.stats.speed) {
      // Speed tie → show coin toss
      setShowCoinOverlay(true);
    } else if (u.stats.speed > e.stats.speed) {
      pushLog(`${capitalize(u.name)} will act first!`);
      setTurnState("user-turn");
    } else {
      pushLog(`${capitalize(e.name)} will act first!`);
      setTurnState("enemy-turn");
    }
  }, [userTrainer, enemyTrainer, pushLog]);

  // -----------------------------
  // Handle coin toss result
  // -----------------------------
  const handleCoinResult = async (side: "heads" | "tails") => {
    if (!userPokemon || !enemyPokemon) return;

    await new Promise(resolve => setTimeout(resolve, 1000)); // slight delay before logging

    pushLog(`Coin toss result: ${side}`);
    if (side === "heads") {
      pushLog(`${userTrainer.username}'s ${' ' + capitalize(userPokemon.name)} will act first!`);
      setTurnState("user-turn");
    } else {
      pushLog(`${userTrainer.username}'s ${' ' + capitalize(enemyPokemon.name)} will act first!`);
      setTurnState("enemy-turn");
    }

    setShowCoinOverlay(false);
  };

  return {
    userPokemon,
    enemyPokemon,
    turnState,
    log,
    pushLog,
    showCoinOverlay,
    handleCoinResult
  };
}
