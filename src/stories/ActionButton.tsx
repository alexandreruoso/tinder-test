import { Button, type SvgIconTypeMap } from '@mui/material'
import { type OverridableComponent } from '@mui/material/OverridableComponent'

export interface ActionButtonProps {
    /** The specific icon to display */
    IconComponent: OverridableComponent<SvgIconTypeMap>
    /** The color scheme of the button */
    color: 'success' | 'error'
    /** The function to call when the button is clicked */
    onClick: () => void
    /** Disables the button to prevent interaction */
    disabled?: boolean
    /** The visible text label for the button */
    label: string
}

/**
 * A styled button with an icon for primary user actions like 'Like' or 'Dislike'.
 */
export const ActionButton = ({
    IconComponent,
    color,
    onClick,
    disabled = false,
    label,
}: ActionButtonProps) => {
    return (
        <Button
            variant="outlined"
            size="large"
            color={color}
            onClick={onClick}
            disabled={disabled}
            startIcon={<IconComponent />}
        >
            {label}
        </Button>
    )
}
