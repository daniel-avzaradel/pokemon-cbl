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
      pushLog(`It's a speed tie! turn will be resolved on a coin toss`);

      setTimeout(() => {
        setShowCoinOverlay(true);
      }, 1500)
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

    await delay(500)

    pushLog(`Coin toss result: ${side}`);
    if (side === "heads") {
      pushLog(`${userTrainer.username}'s ${' ' + capitalize(userPokemon.name)} will act first!`);
      setTurnState("user-turn");
    } else {
      pushLog(`${enemyTrainer.username}'s ${' ' + capitalize(enemyPokemon.name)} will act first!`);
      setTurnState("enemy-turn");
    }

    setShowCoinOverlay(false);
  };

  const handleTurn = useCallback(
  async (userAction: any) => {
    if (!userPokemon || !enemyPokemon) return;
    if (turnState !== "user-turn") return; // prevent spam

    // -------------------------------------------------
    // USER → ENEMY
    // -------------------------------------------------
    setTurnState("resolving");

    const attacker = userPokemon;
    const defender = enemyPokemon;

    pushLog(`${capitalize(attacker.name)} attacks!`);

    await delay(500);

    // Simple damage formula (replace later)
    const damage = Math.max(3, Math.floor((attacker.currentStats.atk - defender.currentStats.def) / 2)
    );

    const newDefenderHp = Math.max(0, defender.currentStats.hp - damage);

    pushLog(
      `${capitalize(attacker.name)} deals ${damage} damage to ${capitalize(
        defender.name
      )}!`
    );

    // Update enemy Pokémon HP
    setEnemyPokemon(prev =>
      prev
        ? {
            ...prev,
            currentStats: {
              ...prev.currentStats,
              hp: newDefenderHp
            }
          }
        : prev
    );

    await delay(600);

    // KO check
    if (newDefenderHp <= 0) {
      pushLog(`${capitalize(defender.name)} fainted!`);
      setTurnState("finished");
      return;
    }

    // -------------------------------------------------
    // ENEMY COUNTERATTACK
    // -------------------------------------------------
    pushLog(`${capitalize(defender.name)} attacks back!`);
    await delay(700);

    const counterDamage = Math.max(1, Math.floor(defender.currentStats.atk - attacker.currentStats.def / 2));

    const newUserHp = Math.max(0, attacker.currentStats.hp - counterDamage);

    pushLog(
      `${capitalize(defender.name)} deals ${counterDamage} damage to ${capitalize(
        attacker.name
      )}!`
    );

    setUserPokemon(prev =>
      prev
        ? {
            ...prev,
            currentStats: {
              ...prev.currentStats,
              hp: newUserHp
            }
          }
        : prev
    );

    await delay(600);

    // KO check
    if (newUserHp <= 0) {
      pushLog(`${capitalize(attacker.name)} fainted!`);
      setTurnState("finished");
      return;
    }

    // -------------------------------------------------
    // END → NEXT USER TURN
    // -------------------------------------------------
    setTurnState("user-turn");
  },
  [userPokemon, enemyPokemon, turnState, pushLog]
);

const enemyAutoTurn = useCallback(async () => {
  if (!enemyPokemon || !userPokemon) return;

  setTurnState("resolving");

  const attacker = enemyPokemon;
  const defender = userPokemon;

  pushLog(`${capitalize(attacker.name)} attacks!`);
  await delay(600);

  const damage = Math.max(
    1,
    Math.floor(attacker.currentStats.atk - defender.currentStats.def / 2)
  );

  const newUserHp = Math.max(0, defender.currentStats.hp - damage);

  pushLog(
    `${capitalize(attacker.name)} deals ${damage} damage to ${capitalize(
      defender.name
    )}!`
  );

  setUserPokemon(prev =>
    prev
      ? {
          ...prev,
          currentStats: {
            ...prev.currentStats,
            hp: newUserHp
          }
        }
      : prev
  );

  await delay(600);

  if (newUserHp <= 0) {
    pushLog(`${capitalize(defender.name)} fainted!`);
    setTurnState("finished");
    return;
  }

  // Switch to user’s turn
  setTurnState("user-turn");
}, [enemyPokemon, userPokemon, pushLog]);

  return {
    userPokemon,
    enemyPokemon,
    turnState,
    log,
    pushLog,
    handleTurn,
    showCoinOverlay,
    handleCoinResult
  };
}
