import { StatusCard, HealthBarBg, HealthBarContainer, HealthBarFill, HpDisplay, StatusHeader } from './CardActions.styled'
import { Heart } from 'lucide-react'

export const StatusCardComponent = () => {
    return (
        <StatusCard>
            <StatusHeader>
                <h3>HP</h3>
                <HpDisplay $color="#4ade80">
                    <Heart style={{ width: '1.25rem', height: '1.25rem' }} />
                    <span>{12} / {12}</span>
                </HpDisplay>
            </StatusHeader>
            <HealthBarContainer>
                <HealthBarBg>
                    <HealthBarFill
                        $width={22 / 22}
                        $color="linear-gradient(to right, #16a34a, #059669)"
                    />
                </HealthBarBg>
            </HealthBarContainer>
        </StatusCard>
    )
}