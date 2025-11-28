import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(100px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0px);
  }
`;

export const ProfileCard = styled.div<{$unlocked?: boolean}>`
  position: relative;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
  border-radius: 1rem;
  padding: 0 1rem;
  border: 2px solid #2a2a2a;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
  opacity: ${p => p.$unlocked ? '1' : '0.4'};
  height: 100%;
  margin: 0;
  padding-top: 1rem;
    
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6rem;
    background: linear-gradient(135deg, #7f1d1d 0%, #450a0a 100%);
    border-bottom: 2px solid #ca8a04;
  }

  &:hover button {
    animation: ${slideUp} .5s linear;
    opacity: 1;
  }
  &:hover section {
    opacity: 0;
  }
`;

export const LockWrapper = styled.div`
  display: flex;
  width: 60px;
  height: 60px;
  padding: .75rem;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  background: #333;
  border-radius: 50%;
  border: 1px solid #ccc;
`

export const LockedDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  height: 100%;
  font-style: italic;
  color: #d1d1d1;
  font-size: 0.875rem;
  text-align: left;
  padding: 0 1rem;
`

export const ProfileContent = styled.div`
  position: relative;
  z-index: 1;
`;

export const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: .75rem;
`;

export const ProfileImageWrapper = styled.div`
  position: relative;
  margin-bottom: .5rem;
`;

export const ProfileImageBorder = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #ca8a04 0%, #eab308 100%);
  padding: 0.375rem;
  box-shadow: 0 10px 30px rgba(202, 138, 4, 0.4);
`;

export const ProfileImage = styled.div<{ $imageUrl: string }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-image: url(${props => props.$imageUrl});
  background-size: cover;
  background-position: 50%;
  border: 3px solid #1a1a1a;
`;

export const LevelBadge = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background: linear-gradient(135deg, #7f1d1d 0%, #450a0a 100%);
  border: 3px solid #ca8a04;
  border-radius: 50%;
  width: 2.6rem;
  height: 2.65rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #eab308;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
`;

export const TrainerName = styled.h2`
  color: white;
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
  text-align: center;
`;

export const TrainerTitle = styled.p`
  color: #eab308;
  font-size: 1rem;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: .5rem;
  margin-bottom: 1rem;
`;

export const StatBox = styled.div`
  background: #262626;
  border: 1px solid #404040;
  border-radius: 0.75rem;
  padding: .5rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: #ca8a04;
    transform: translateY(-2px);
  }
`;

export const StatIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.25rem;
  color: #eab308;
`;

export const StatValue = styled.div`
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

export const StatLabel = styled.div`
  color: #9ca3af;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const PokemonSection = styled.div`
  margin: 2rem 0;
`;

export const SectionTitle = styled.h3`
  color: white;
  font-size: 1rem;
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.5rem;
`;

export const PokemonList = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0.5rem;
  overflow-y: auto;
  text-transform: capitalize;
  font-size: 0.9rem;
  transition: 0.5s ease-in-out;
  padding: 0 .5rem;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background: #262626;
    border-radius: 0.25rem;
  }

  &::-webkit-scrollbar-thumb {
    background: #7f1d1d;
    border-radius: 0.25rem;

    &:hover {
      background: #991b1b;
    }
  }
`;

export const ActionButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 1rem;
  left: 50%;
  gap: 0 10px;
  transform: translateX(-50%);
  font-size: .9rem;
  width: auto;
  background: #7f1d1d;
  color: white;
  padding: 0.75rem 2rem;
  height: 46px;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid rgba(80, 11, 11, 1);
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0;
  z-index: 10;
  font-size: 1.25rem;
  transition: 0.4s ease-in;

  &:hover {
    background: #991b1b;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  color: #737373;
  font-style: italic;
`;

export const typeColors: Record<string, string> = {
  fire: '#dc2626',
  water: '#2563eb',
  grass: '#16a34a',
  electric: '#eab308',
  psychic: '#9333ea',
  fighting: '#c2410c',
  normal: '#737373'
};
