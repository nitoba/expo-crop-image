"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconButton = void 0;
const react_native_1 = require("react-native");
const Icon_1 = require("./Icon");
function IconButton(props) {
    const { text, iconID, ...buttonProps } = props;
    const iconProps = { text, iconID };
    return (<react_native_1.TouchableOpacity {...buttonProps}>
      <Icon_1.Icon {...iconProps}/>
    </react_native_1.TouchableOpacity>);
}
exports.IconButton = IconButton;
//# sourceMappingURL=IconButton.js.map