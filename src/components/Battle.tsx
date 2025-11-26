import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { UserData, Card } from '../App';
import { PokemonCard } from './PokemonCard';
import { Swords, Shield, Heart, Zap, Trophy, RotateCcw } from 'lucide-react';
import { generateRandomCard } from '../utils/cardGenerator';

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.div`
  h2 {
    color: white;
    font-size: 1.875rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: #9ca3af;
  }
`;

const SetupCard = styled.div`
  background: #1a1a1a;
  backdrop-filter: blur(12px);
  border-radius: 1rem;
  padding: 3rem;
  text-align: center;
  border: 1px solid #2a2a2a;

  h3 {
    color: white;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    color: #9ca3af;
    margin-bottom: 2rem;
  }
`;

const StartButton = styled.button<{ $disabled: boolean }>`
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  border: ${props => props.$disabled ? '1px solid #404040' : '1px solid rgba(202, 138, 4, 0.3)'};
  background: ${props => props.$disabled ? '#262626' : 'linear-gradient(to right, #7f1d1d, #450a0a)'};
  color: ${props => props.$disabled ? '#737373' : 'white'};
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$disabled ? '#262626' : 'linear-gradient(to right, #991b1b, #7f1d1d)'};
    transform: ${props => props.$disabled ? 'none' : 'scale(1.05)'};
  }
`;

const BattleArena = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const BattleGrid = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PlayerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StatusCard = styled.div`
  background: #1a1a1a;
  backdrop-filter: blur(12px);
  border-radius: 0.75rem;
  padding: 1rem;
  border: 1px solid #2a2a2a;
`;

const StatusHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;

  h3 {
    color: white;
    margin: 0;
  }
`;

const HpDisplay = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.$color};
`;

const HealthBarContainer = styled.div`
  position: relative;
`;

const HealthBarBg = styled.div`
  width: 100%;
  height: 0.75rem;
  background: #262626;
  border-radius: 9999px;
  overflow: hidden;
  border: 1px solid #404040;
`;

const HealthBarFill = styled.div<{ $width: number; $color: string }>`
  height: 100%;
  background: ${props => props.$color};
  transition: width 0.5s ease;
  width: ${props => props.$width}%;
`;

const CardDisplay = styled.div`
  max-width: 20rem;
  margin: 0 auto;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button<{ $variant: 'attack' | 'defend' }>`
  flex: 1;
  background: ${props => props.$variant === 'attack' 
    ? 'linear-gradient(to right, #7f1d1d, #450a0a)' 
    : '#262626'};
  color: white;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: ${props => props.$variant === 'attack' 
    ? '1px solid rgba(202, 138, 4, 0.3)' 
    : '1px solid #525252'};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.$variant === 'attack' 
      ? 'linear-gradient(to right, #991b1b, #7f1d1d)' 
      : '#404040'};
  }
`;

const TurnIndicator = styled.div`
  background: #262626;
  border: 1px solid #404040;
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;

  p {
    color: #eab308;
  }
`;

const BattleLog = styled.div`
  background: #1a1a1a;
  backdrop-filter: blur(12px);
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 1px solid #2a2a2a;

  h3 {
    color: white;
    margin-bottom: 1rem;
  }
`;

const LogContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 10rem;
  overflow-y: auto;

  div {
    color: #9ca3af;
    font-size: 0.875rem;
  }
`;

const ResultCard = styled.div`
  background: #1a1a1a;
  backdrop-filter: blur(12px);
  border-radius: 1rem;
  padding: 3rem;
  text-align: center;
  border: 1px solid #2a2a2a;

  h3 {
    color: white;
    font-size: 1.875rem;
    margin-bottom: 1rem;
  }
`;

const DefeatIcon = styled.div`
  width: 5rem;
  height: 5rem;
  background: rgba(127, 29, 29, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  border: 2px solid #991b1b;
  font-size: 2.25rem;
`;

const ResetButton = styled.button`
  background: linear-gradient(to right, #7f1d1d, #450a0a);
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(202, 138, 4, 0.3);
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: linear-gradient(to right, #991b1b, #7f1d1d);
  }
`;

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
      playerHp: playerCard.hp,
      enemyHp: enemyCard.hp,
      turn: 'player',
      battleLog: [`Battle started! ${playerCard.name} vs ${enemyCard.name}`],
      status: 'battle'
    });
  };

  const attack = () => {
    if (battleState.status !== 'battle' || !battleState.playerCard || !battleState.enemyCard) return;

    const damage = Math.max(1, battleState.playerCard.attack - Math.floor(battleState.enemyCard.defense / 2));
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
        const damage = Math.max(1, battleState.enemyCard.attack - Math.floor(battleState.playerCard.defense / 2));
        const newPlayerHp = Math.max(0, battleState.playerHp - damage);

        const newLog = [...battleState.battleLog, `${battleState.enemyCard.name} attacks for ${damage} damage!`];

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
                    <span>{battleState.playerHp} / {battleState.playerCard?.hp}</span>
                  </HpDisplay>
                </StatusHeader>
                <HealthBarContainer>
                  <HealthBarBg>
                    <HealthBarFill 
                      $width={(battleState.playerHp / (battleState.playerCard?.hp || 1)) * 100}
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
                    <span>{battleState.enemyHp} / {battleState.enemyCard?.hp}</span>
                  </HpDisplay>
                </StatusHeader>
                <HealthBarContainer>
                  <HealthBarBg>
                    <HealthBarFill 
                      $width={(battleState.enemyHp / (battleState.enemyCard?.hp || 1)) * 100}
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
