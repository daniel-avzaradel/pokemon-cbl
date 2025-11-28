import React from 'react'
import { BattleContainer, BattleHeader, IconWrapper, LevelContainer } from './Battle.styled'
import { Swords } from 'lucide-react'

const BattleSystem = () => {
  return (
    <BattleContainer>
      <BattleHeader>
      </BattleHeader>
      <IconWrapper>
        <span>Battle</span>
        <Swords size={60} color='rgb(127, 29, 29)' />
        <span>Arena</span>
      </IconWrapper>
    </BattleContainer>
  )
}

export default BattleSystem