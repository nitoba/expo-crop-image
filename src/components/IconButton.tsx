import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { FeatherIconIDs, Icon, MaterialIconIDs } from "./Icon";

type IconButton = {
  text: string;
  iconID: MaterialIconIDs | FeatherIconIDs;
} & TouchableOpacityProps;

export function IconButton(props: IconButton) {
  const { text, iconID, ...buttonProps } = props;
  const iconProps = { text, iconID };
  return (
    <TouchableOpacity {...buttonProps}>
      <Icon {...iconProps} />
    </TouchableOpacity>
  );
}
