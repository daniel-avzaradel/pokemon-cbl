import { Star, Trophy, Zap } from 'lucide-react';
import { EmptyState, LevelBadge, PokemonInfo, PokemonItem, PokemonList, PokemonName, PokemonSection, PokemonStat, PokemonStats, PokemonType, ProfileCard, ProfileContent, ProfileHeader, ProfileImage, ProfileImageBorder, ProfileImageWrapper, SectionTitle, StatBox, StatIcon, StatLabel, StatsGrid, StatValue, TrainerName, TrainerTitle } from './TrainerCard.styles';
import { typeColors } from '../common/PokemonCards.styles';
import { TrainerCardI } from './Battle';


export function TrainerCard(trainer : TrainerCardI) {
  // Calculate trainer level based on cards collected
  const trainerLevel = 1
  
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
            <LevelBadge>{trainerLevel}</LevelBadge>
          </ProfileImageWrapper>
          <TrainerName>{trainer.trainer}</TrainerName>
          <TrainerTitle>Pokemon Trainer</TrainerTitle>
        </ProfileHeader>

        <StatsGrid>
          <StatBox>
            <StatIcon>
              <Star style={{ width: '1.5rem', height: '1.5rem' }} />
            </StatIcon>
            <StatValue>{trainerLevel}</StatValue>
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
              {trainer.pokemons.map((pokemon) => (
                <PokemonItem key={pokemon.id} $typeColor={typeColors['bug']}>
                  <PokemonInfo>
                    <PokemonName>{pokemon.name}</PokemonName>
                    <PokemonType>type</PokemonType>
                  </PokemonInfo>
                  <PokemonStats>
                    <PokemonStat $color="#f87171">HP {45}</PokemonStat>
                    <PokemonStat $color="#eab308">ATK {90}</PokemonStat>
                    <PokemonStat $color="#60a5fa">DEF {67}</PokemonStat>
                  </PokemonStats>
                </PokemonItem>
              ))}
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