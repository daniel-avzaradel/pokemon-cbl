import { useMemo, useState } from 'react'
import { StatusCard, HealthBarBg, HealthBarContainer, HealthBarFill, HpDisplay, StatusHeader } from './CardActions.styled'
import { Heart } from 'lucide-react'
import { selectedPokemonProps } from 'src/components/lib/battleSlice';

interface StatusProps {
    card: selectedPokemonProps;
    user?: boolean;
}

export const StatusCardComponent = ({ card, user }: StatusProps) => {
    
    if (!card.currentStats) return

    const hp = useMemo(() => ({
        current: card.currentStats.hp,
        max: card.stats.hp
    }), [card.currentStats.hp, card.stats.hp]);


    return (
        <StatusCard>
            <StatusHeader>
                <h3>HP</h3>
                <HpDisplay $color={user ? "#16a34a" : "#881e1eff"}>
                    <Heart style={{ width: '1.25rem', height: '1.25rem' }} />
                    <span>{hp.current} / {hp.max}</span>
                </HpDisplay>
            </StatusHeader>
            <HealthBarContainer>
                <HealthBarBg>
                    <HealthBarFill
                        $width={hp.max > 0 ? (hp.current / hp.max) * 100 : 0}
                        $color={user ? "linear-gradient(to right, #16a34a, #0d4e25ff)" : "linear-gradient(to right, #b42f2fff, #550d0dff)"}
                    />
                </HealthBarBg>
            </HealthBarContainer>
        </StatusCard>
    )
}