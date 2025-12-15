import { useCallback, useEffect, useRef, useState } from "react";
import { Card, UserData } from "../../App";
import { capitalize, delay } from "../common/utils";

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

  const [showCoinOverlay, setShowCoinOverlay] = useState(false);

  const logQueue = useRef<string[]>([]);
  const isLogging = useRef(false);

  // ---------------------------------------------------
  // Logging system
  // ---------------------------------------------------
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

  // ---------------------------------------------------
  // Initialize battle
  // ---------------------------------------------------
  useEffect(() => {
    if (!userTrainer || !enemyTrainer) return;

    const u = userTrainer.battleDeck[0];
    const e = enemyTrainer.battleDeck[0];
    if (!u || !e) return;

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

    // Speed check
    if (u.stats.speed === e.stats.speed) {
      pushLog("It's a speed tie! Deciding by coin toss...");
      setTimeout(() => setShowCoinOverlay(true), 1200);
    } else if (u.stats.speed > e.stats.speed) {
      pushLog(`${capitalize(u.name)} will act first!`);
      setTurnState("user-turn");
    } else {
      pushLog(`${capitalize(e.name)} will act first!`);
      setTurnState("enemy-turn");
    }
  }, [userTrainer, enemyTrainer, pushLog]);

  // ---------------------------------------------------
  // Coin toss result
  // ---------------------------------------------------
  const handleCoinResult = async (side: "heads" | "tails") => {
    if (!userPokemon || !enemyPokemon) return;

    await delay(500);

    pushLog(`Coin toss result: ${side}`);

    if (side === "heads") {
      pushLog(`${userTrainer.username}'s ${userPokemon.name} will act first!`);
      setTurnState("user-turn");
    } else {
      pushLog(`${enemyTrainer.username}'s ${enemyPokemon.name} will act first!`);
      setTurnState("enemy-turn");
    }

    setShowCoinOverlay(false);
  };

  // ---------------------------------------------------
  // USER TURN handler
  // ---------------------------------------------------
  const handleTurn = useCallback(
    async () => {
      if (turnState !== "user-turn") return;
      if (!userPokemon || !enemyPokemon) return;

      setTurnState("resolving");

      const attacker = userPokemon;
      const defender = enemyPokemon;

      pushLog(`${capitalize(attacker.name)} attacks!`);
      await delay(400);

      const dmg = Math.max(3, Math.floor((attacker.currentStats.atk - defender.currentStats.def) / 2));
      const newHp = Math.max(0, defender.currentStats.hp - dmg);

      pushLog(`${capitalize(attacker.name)} dealt ${dmg} damage!`);

      setEnemyPokemon(prev => prev ? {
        ...prev,
        currentStats: { ...prev.currentStats, hp: newHp }
      } : prev);

      await delay(600);

      if (newHp <= 0) {
        pushLog(`${capitalize(defender.name)} fainted!`);
        setTurnState("finished");
        return;
      }

      // Switch to enemy turn
      setTurnState("enemy-turn");
    },
    [turnState, userPokemon, enemyPokemon, pushLog]
  );

  // ---------------------------------------------------
  // ENEMY TURN handler (auto)
  // ---------------------------------------------------
  const enemyAutoTurn = useCallback(
    async () => {
      if (!enemyPokemon || !userPokemon) return;

      setTurnState("resolving");

      const attacker = enemyPokemon;
      const defender = userPokemon;

      pushLog(`${capitalize(attacker.name)} attacks!`);
      await delay(500);

      const dmg = Math.max(2, Math.floor((attacker.currentStats.atk - defender.currentStats.def) / 2));
      const newHp = Math.max(0, defender.currentStats.hp - dmg);

      pushLog(`${capitalize(attacker.name)} dealt ${dmg} damage!`);

      setUserPokemon(prev => prev ? {
        ...prev,
        currentStats: { ...prev.currentStats, hp: newHp }
      } : prev);

      await delay(500);

      if (newHp <= 0) {
        pushLog(`${capitalize(defender.name)} fainted!`);
        setTurnState("finished");
        return;
      }

      setTurnState("user-turn");
    },
    [enemyPokemon, userPokemon, pushLog]
  );

  // ---------------------------------------------------
  // Enemy turn triggers automatically!
  // ---------------------------------------------------
  useEffect(() => {
    if (turnState === "enemy-turn") {
      enemyAutoTurn();
    }
  }, [turnState, enemyAutoTurn]);

  return {
    userPokemon,
    enemyPokemon,
    turnState,
    log,
    showCoinOverlay,
    pushLog,
    handleTurn,
    handleCoinResult
  };
}
