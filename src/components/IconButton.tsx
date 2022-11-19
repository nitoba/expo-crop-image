import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { FeatherIconIDs, Icon, MaterialIconIDs } from './Icon'

type IconButtonProps = {
  text: string
  iconID: MaterialIconIDs | FeatherIconIDs
} & TouchableOpacityProps

export function IconButton({ text, iconID, ...buttonProps }: IconButtonProps) {
  return (
    <TouchableOpacity {...buttonProps}>
      <Icon text={text} iconID={iconID} />
    </TouchableOpacity>
  )
}
