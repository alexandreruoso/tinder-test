import { Button, type SvgIconTypeMap } from '@mui/material'
import { type OverridableComponent } from '@mui/material/OverridableComponent'

export interface ActionButtonProps {
    IconComponent: OverridableComponent<SvgIconTypeMap>
    color: 'success' | 'error'
    onClick: () => void
    disabled?: boolean
    label: string
    size?: 'small' | 'medium' | 'large'
}

export const ActionButton = ({
    IconComponent,
    color,
    onClick,
    disabled = false,
    label,
    size = 'large',
}: ActionButtonProps) => {
    return (
        <Button
            variant="contained"
            size={size}
            color={color}
            onClick={onClick}
            disabled={disabled}
            startIcon={<IconComponent />}
        >
            {label}
        </Button>
    )
}
