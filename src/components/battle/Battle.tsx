import { Swords } from 'lucide-react';
import { UserData } from '../../App';
import { BattleContainer, BattleHeader, IconWrapper, LevelContainer } from './Battle.styled';
import { TrainerCard } from './TrainerCard';

import { useEffect, useState } from 'react';
import { trainerPokemonGenerator } from './trainerUtils';
import { TrainerCardI, trainersData } from './trainersData';

export interface BattleProps {
  user: UserData;
  updateUser: (user: UserData) => void;
}


const Battle = ({ user, updateUser }: BattleProps) => {

  const [trainers, setTrainers] = useState<TrainerCardI[]>(trainersData)

  useEffect(() => {
    const fetchTeam = async () => {
      const teamBugCatcher = await trainerPokemonGenerator([{name: 'rattata'}, {name: 'caterpie'}, {name: 'weedle'}, {name: 'nidoran-m'}, {name: 'beedrill'}]);
      const teamRocket = await trainerPokemonGenerator([{name: 'ekans'}, {name: 'koffing'}, {name: 'meowth'}, {name: 'lickitung'}, {name: 'golbat'}]);
      const brock = await trainerPokemonGenerator([{name: 'geodude'}, {name: 'onix'}, {name: 'vulpix'}, {name: 'tauros'}, {name: 'golem'}]);
      const ash = await trainerPokemonGenerator([{name: 'pikachu'}, {name: 'charizard'}, {name: 'blastoise'}, {name: 'primeape'}, {name: 'butterfree'}, {name: 'snorlax'}]);
      const daniel = await trainerPokemonGenerator([{name: 'gengar'}, {name: 'jolteon', foil: true}, {name: 'blastoise'}, {name: 'dragonite', foil: true}, {name: 'arcanine'}, {name: 'articuno'}]);
      setTrainers(prev => {
        return prev.map(t => {
          return t.name === 'Bug Catcher' ? {...t, pokemons: teamBugCatcher} 
          : t.name === 'Team Rocket' ? {...t, pokemons: teamRocket} 
          : t.name === 'Brock' ? {...t, pokemons: brock} 
          : t.name === 'Ash Ketchum' ? {...t, pokemons: ash} 
          : t.name === 'Daniel Avzaradel' ? {...t, pokemons: daniel} 
          : t
        })
      })
    };
    fetchTeam();
  }, []);

  return (
    <BattleContainer>
      <BattleHeader>
      </BattleHeader>
      <IconWrapper>
        <span>Battle</span>
        <Swords size={48} color='rgb(127, 29, 29)' />
        <span>Arena</span>
      </IconWrapper>
      <LevelContainer>
        {trainers.map((trainer: TrainerCardI, i: number) => {
          return <TrainerCard {...{ trainer, user, updateUser}} key={trainer.name + i} />
        })}
      </LevelContainer>
    </BattleContainer>
  )
}

export default Battle