import { Star, Coins, Zap, LockIcon, Swords } from 'lucide-react';
import { ActionButton, EmptyState, LevelBadge, LockedDiv, LockWrapper, PokemonList, PokemonSection, ProfileCard, ProfileContent, ProfileHeader, ProfileImage, ProfileImageBorder, ProfileImageWrapper, SectionTitle, StatBox, StatIcon, StatLabel, StatsGrid, StatValue, TrainerName, TrainerTitle } from './TrainerCard.styles';

import PokeBall from '/assets/pokeball.png'
import { TrainerCardI } from './trainersData';
import { UserData } from '../../App';
import { Link } from 'react-router-dom';

interface TrainerCardProps {
  trainer: TrainerCardI;
  user: UserData;
  updateUser: (user: UserData) => void;
}

export function TrainerCard({ trainer, user, updateUser }: TrainerCardProps) {
  
  const userArenaTrainer = user.arena?.find(t => t.name === trainer.name)

  const isUnlocked = () => {
    if(userArenaTrainer) {
      return userArenaTrainer.unlocked
    }
    return false
  }

  return (
    <ProfileCard $unlocked={isUnlocked()}>
      <ProfileContent>
        <ProfileHeader>
          <ProfileImageWrapper>
            <ProfileImageBorder>
              <ProfileImage $imageUrl={isUnlocked() ? trainer.profile : ""} />
            </ProfileImageBorder>
            <LevelBadge>{trainer.level}</LevelBadge>
          </ProfileImageWrapper>
          <TrainerName>{trainer.name}</TrainerName>
          <TrainerTitle>{trainer.title}</TrainerTitle>
        </ProfileHeader>

        <StatsGrid>
          <StatBox>
            <StatIcon>
              <Star style={{ width: '1.5rem', height: '1.5rem' }} />
            </StatIcon>
            <StatValue>{trainer.level}</StatValue>
            <StatLabel>Level</StatLabel>
          </StatBox>

          <StatBox>
            <StatIcon>
              <Coins style={{ width: '1.5rem', height: '1.5rem' }} />
            </StatIcon>
            <StatValue>{trainer.rewardCoins}</StatValue>
            <StatLabel>Reward Coins</StatLabel>
          </StatBox>

          <StatBox>
            <StatIcon>
              <Zap style={{ width: '1.5rem', height: '1.5rem' }} />
            </StatIcon>
            <StatValue>{1}</StatValue>
            <StatLabel>Cards</StatLabel>
          </StatBox>
        </StatsGrid>

        <PokemonSection>
          <SectionTitle>
            <Zap style={{ width: '1.25rem', height: '1.25rem', color: '#eab308' }} />
            Pokemon
          </SectionTitle>
          
          {trainer.pokemons.length > 0 && userArenaTrainer?.unlocked ? (
            <PokemonList>
              {trainer.pokemons.map((pokemon, i: number) => {
                return (
                  <div style={{ display: 'flex', gap: '.5rem' }} key={Math.random() * 99999999 + i}>
                  <img src={PokeBall} width={22} />
                  <span>{pokemon.name}</span>
                  </div>
                )
              })}
            </PokemonList>
          ) : userArenaTrainer?.unlocked ? (
            <EmptyState>
              No Pokemon collected yet. Visit the shop to start your collection!
            </EmptyState>
          ) : (
            <LockedDiv>
              <LockWrapper>
                <LockIcon size={40} />
              </LockWrapper>
              <span>Unlock this trainer by defeating all previous trainer challenges.</span>
            </LockedDiv>
          )}
          {userArenaTrainer?.unlocked && (
            <Link to={`/battle/${trainer.id}`} state={{user, trainer}}>
              <ActionButton>
                <Swords /> Battle
              </ActionButton>
            </Link>
          )}
        </PokemonSection>
      </ProfileContent>
    </ProfileCard>
  );
}