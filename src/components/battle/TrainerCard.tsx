import { Star, Trophy, Zap } from 'lucide-react';
import { TrainerCardI } from './Battle';
import { EmptyState, LevelBadge, PokemonList, PokemonSection, ProfileCard, ProfileContent, ProfileHeader, ProfileImage, ProfileImageBorder, ProfileImageWrapper, SectionTitle, StatBox, StatIcon, StatLabel, StatsGrid, StatValue, TrainerName, TrainerTitle } from './TrainerCard.styles';

import PokeBall from '../../assets/pokeball.png'

export function TrainerCard(trainer : TrainerCardI) {
  
  // Calculate total battles won (using coins as proxy)
  const battlesWon = 3

  return (
    <ProfileCard>
      <ProfileContent>
        <ProfileHeader>
          <ProfileImageWrapper>
            <ProfileImageBorder>
              <ProfileImage $imageUrl={trainer.profile} />
            </ProfileImageBorder>
            <LevelBadge>{trainer.level}</LevelBadge>
          </ProfileImageWrapper>
          <TrainerName>{trainer.name}</TrainerName>
          <TrainerTitle>Pokemon Trainer</TrainerTitle>
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
              <Trophy style={{ width: '1.5rem', height: '1.5rem' }} />
            </StatIcon>
            <StatValue>{battlesWon}</StatValue>
            <StatLabel>Battles Won</StatLabel>
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
            My Pokemon Collection
          </SectionTitle>
          
          {trainer.pokemons.length > 0 ? (
            <PokemonList>
              {trainer.pokemons.map((pokemon) => {
                return (
                  <div style={{ display: 'flex', gap: '1rem' }}>
                  <img src={PokeBall} width={30} />
                  <span>{pokemon.name}</span>
                  </div>
                )
              })}
            </PokemonList>
          ) : (
            <EmptyState>
              No Pokemon collected yet. Visit the shop to start your collection!
            </EmptyState>
          )}
        </PokemonSection>
      </ProfileContent>
    </ProfileCard>
  );
}