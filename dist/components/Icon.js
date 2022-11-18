"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Icon = void 0;
const vector_icons_1 = require("@expo/vector-icons");
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
function Icon(props) {
    return (<react_native_1.View style={styles.container}>
      {props.iconID === "x" ? (<vector_icons_1.Feather name={props.iconID} size={26} color={"white"}/>) : (<vector_icons_1.MaterialIcons name={props.iconID} size={26} color={"white"}/>)}
      <react_native_1.Text style={styles.text}>{props.text}</react_native_1.Text>
    </react_native_1.View>);
}
exports.Icon = Icon;
const styles = react_native_1.StyleSheet.create({
    container: {
        height: 64,
        width: 80,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
    },
    text: {
        color: "#fff",
        textAlign: "center",
    },
});
//# sourceMappingURL=Icon.js.map