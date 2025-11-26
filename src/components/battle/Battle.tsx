import { useState, useEffect } from 'react';
import { UserData, Card } from '../../App';
import { PokemonCard } from '../common/PokemonCard';
import { Swords, Shield, Heart, Zap, Trophy, RotateCcw } from 'lucide-react';
import { generateRandomCard } from '../../utils/cardGenerator';
import { ActionButton, ActionButtons, BattleArena, BattleGrid, BattleLog, CardDisplay, Container, DefeatIcon, Header, HealthBarBg, HealthBarContainer, HealthBarFill, HpDisplay, LogContent, PlayerSection, ResetButton, ResultCard, SetupCard, StartButton, StatusCard, StatusHeader, TurnIndicator } from './Battle.styles';

interface BattleProps {
  user: UserData;
  updateUser: (user: UserData) => void;
}

interface BattleState {
  playerCard: Card | null;
  enemyCard: Card | null;
  playerHp: number;
  enemyHp: number;
  turn: 'player' | 'enemy';
  battleLog: string[];
  status: 'setup' | 'battle' | 'victory' | 'defeat';
}

export function Battle({ user, updateUser }: BattleProps) {
  const [battleState, setBattleState] = useState<BattleState>({
    playerCard: null,
    enemyCard: null,
    playerHp: 0,
    enemyHp: 0,
    turn: 'player',
    battleLog: [],
    status: 'setup'
  });

  const startBattle = () => {
    if (user.battleDeck.length === 0) {
      alert('Add cards to your battle deck first!');
      return;
    }

    const playerCard = user.battleDeck[Math.floor(Math.random() * user.battleDeck.length)];
    const enemyCard = generateRandomCard(true, false);

    setBattleState({
      playerCard,
      enemyCard,
      playerHp: playerCard.stats.hp,
      enemyHp: enemyCard.stats.hp,
      turn: 'player',
      battleLog: [`Battle started! ${playerCard.name} vs ${enemyCard.name}`],
      status: 'battle'
    });
  };

  const attack = () => {
  if (battleState.status !== 'battle' || !battleState.playerCard || !battleState.enemyCard) return;

  const damage = Math.max(1, battleState.playerCard.stats.attack - Math.floor(battleState.enemyCard.stats.defense / 2));
  const newEnemyHp = Math.max(0, battleState.enemyHp - damage);

  const newLog = [...battleState.battleLog, `${battleState.playerCard.name} attacks for ${damage} damage!`];

    if (newEnemyHp <= 0) {
      const reward = 50 + Math.floor(Math.random() * 50);
      updateUser({
        ...user,
        coins: user.coins + reward
      });

      setBattleState({
        ...battleState,
        enemyHp: 0,
        battleLog: [...newLog, `Victory! You earned ${reward} coins!`],
        status: 'victory'
      });
      return;
    }

    setBattleState({
      ...battleState,
      enemyHp: newEnemyHp,
      turn: 'enemy',
      battleLog: newLog
    });
  };

  const defend = () => {
  if (battleState.status !== 'battle' || !battleState.playerCard) return;

    const newLog = [...battleState.battleLog, `${battleState.playerCard.name} defends! Defense increased temporarily.`];

    setBattleState({
      ...battleState,
      turn: 'enemy',
      battleLog: newLog
    });
  };

  useEffect(() => {
    if (battleState.turn === 'enemy' && battleState.status === 'battle' && battleState.enemyCard && battleState.playerCard) {
      const timeout = setTimeout(() => {
        const damage = Math.max(1, battleState.enemyCard!.stats.attack - Math.floor(battleState.playerCard!.stats.defense / 2));
        const newPlayerHp = Math.max(0, battleState.playerHp - damage);

        const newLog = [...battleState.battleLog, `${battleState.enemyCard!.name} attacks for ${damage} damage!`];

        if (newPlayerHp <= 0) {
          setBattleState({
            ...battleState,
            playerHp: 0,
            battleLog: [...newLog, 'Defeat! Try again with a stronger deck.'],
            status: 'defeat'
          });
          return;
        }

        setBattleState({
          ...battleState,
          playerHp: newPlayerHp,
          turn: 'player',
          battleLog: newLog
        });
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [battleState.turn]);

  const resetBattle = () => {
    setBattleState({
      playerCard: null,
      enemyCard: null,
      playerHp: 0,
      enemyHp: 0,
      turn: 'player',
      battleLog: [],
      status: 'setup'
    });
  };

  return (
    <Container>
      <Header>
        <h2>Battle Arena</h2>
        <p>Challenge opponents and earn coins</p>
      </Header>

      {battleState.status === 'setup' ? (
        <SetupCard>
          <Swords style={{ width: '5rem', height: '5rem', color: '#525252', margin: '0 auto 1rem' }} />
          <h3>Ready to Battle?</h3>
          <p>
            {user.battleDeck.length > 0 
              ? `Your deck has ${user.battleDeck.length} card${user.battleDeck.length > 1 ? 's' : ''} ready`
              : 'Add cards to your battle deck first'}
          </p>
          <StartButton
            onClick={startBattle}
            $disabled={user.battleDeck.length === 0}
          >
            Start Battle
          </StartButton>
        </SetupCard>
      ) : (
        <BattleArena>
          <BattleGrid>
            {/* Player Side */}
            <PlayerSection>
              <StatusCard>
                <StatusHeader>
                  <h3>Your Card</h3>
                  <HpDisplay $color="#4ade80">
                    <Heart style={{ width: '1.25rem', height: '1.25rem' }} />
                    <span>{battleState.playerHp} / {battleState.playerCard?.stats.hp}</span>
                  </HpDisplay>
                </StatusHeader>
                <HealthBarContainer>
                  <HealthBarBg>
                    <HealthBarFill 
                      $width={(battleState.playerHp / (battleState.playerCard?.stats.hp || 1)) * 100}
                      $color="linear-gradient(to right, #16a34a, #059669)"
                    />
                  </HealthBarBg>
                </HealthBarContainer>
              </StatusCard>

              {battleState.playerCard && (
                <CardDisplay>
                  <PokemonCard card={battleState.playerCard} large />
                </CardDisplay>
              )}

              {battleState.status === 'battle' && battleState.turn === 'player' && (
                <ActionButtons>
                  <ActionButton $variant="attack" onClick={attack}>
                    <Swords style={{ width: '1.25rem', height: '1.25rem' }} />
                    <span>Attack</span>
                  </ActionButton>
                  <ActionButton $variant="defend" onClick={defend}>
                    <Shield style={{ width: '1.25rem', height: '1.25rem' }} />
                    <span>Defend</span>
                  </ActionButton>
                </ActionButtons>
              )}

              {battleState.turn === 'enemy' && battleState.status === 'battle' && (
                <TurnIndicator>
                  <Zap style={{ width: '1.5rem', height: '1.5rem', color: '#eab308', margin: '0 auto 0.5rem', animation: 'pulse 2s infinite' }} />
                  <p>Enemy's turn...</p>
                </TurnIndicator>
              )}
            </PlayerSection>

            {/* Enemy Side */}
            <PlayerSection>
              <StatusCard>
                <StatusHeader>
                  <h3>Enemy Card</h3>
                    <HpDisplay $color="#f87171">
                    <Heart style={{ width: '1.25rem', height: '1.25rem' }} />
                    <span>{battleState.enemyHp} / {battleState.enemyCard?.stats.hp}</span>
                  </HpDisplay>
                </StatusHeader>
                <HealthBarContainer>
                  <HealthBarBg>
                    <HealthBarFill 
                      $width={(battleState.enemyHp / (battleState.enemyCard?.stats.hp || 1)) * 100}
                      $color="linear-gradient(to right, #dc2626, #c2410c)"
                    />
                  </HealthBarBg>
                </HealthBarContainer>
              </StatusCard>

              {battleState.enemyCard && (
                <CardDisplay>
                  <PokemonCard card={battleState.enemyCard} large />
                </CardDisplay>
              )}
            </PlayerSection>
          </BattleGrid>

          {/* Battle Log */}
          <BattleLog>
            <h3>Battle Log</h3>
            <LogContent>
              {battleState.battleLog.map((log, index) => (
                <div key={index}>{log}</div>
              ))}
            </LogContent>
          </BattleLog>

          {/* Victory/Defeat Screen */}
          {(battleState.status === 'victory' || battleState.status === 'defeat') && (
            <ResultCard>
              {battleState.status === 'victory' ? (
                <>
                  <Trophy style={{ width: '5rem', height: '5rem', color: '#eab308', margin: '0 auto 1rem' }} />
                  <h3>Victory!</h3>
                </>
              ) : (
                <>
                  <DefeatIcon>💀</DefeatIcon>
                  <h3>Defeat</h3>
                </>
              )}
              <ResetButton onClick={resetBattle}>
                <RotateCcw style={{ width: '1.25rem', height: '1.25rem' }} />
                <span>New Battle</span>
              </ResetButton>
            </ResultCard>
          )}
        </BattleArena>
      )}
    </Container>
  );
}
