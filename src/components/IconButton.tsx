import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { FeatherIconIDs, Icon, MaterialIconIDs } from './Icon'

type IconButtonProps = {
  text: string
  iconID: MaterialIconIDs | FeatherIconIDs
} & TouchableOpacityProps

export function IconButton(props: IconButtonProps) {
  const { text, iconID, ...buttonProps } = props
  const iconProps = { text, iconID }
  return (
    <TouchableOpacity {...buttonProps}>
      <Icon {...iconProps} />
    </TouchableOpacity>
  )
}
