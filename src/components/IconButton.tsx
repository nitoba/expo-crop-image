import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Icon } from './Icon'

type IconButtonProps = {
  color: string
  text: string
  textColor?: string
} & TouchableOpacityProps

export function IconButton({
  text,
  color,
  textColor,
  ...buttonProps
}: IconButtonProps) {
  return (
    <TouchableOpacity {...buttonProps}>
      <Icon text={text} color={color} textColor={textColor} />
    </TouchableOpacity>
  )
}
