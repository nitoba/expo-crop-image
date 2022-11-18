import React from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "./Icon";

export function IconButton(props) {
  const { text, iconID, ...buttonProps } = props;
  const iconProps = { text, iconID };
  return (
    <TouchableOpacity {...buttonProps}>
      <Icon {...iconProps} />
    </TouchableOpacity>
  );
}
