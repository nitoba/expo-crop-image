"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlBar = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const recoil_1 = require("recoil");
const IconButton_1 = require("./components/IconButton");
const editor_1 = require("./context/editor");
const usePerformCrop_1 = require("./customHooks/usePerformCrop");
const Store_1 = require("./Store");
function ControlBar() {
    const [isEdit, setIsEdit] = (0, recoil_1.useRecoilState)(Store_1.isEditState);
    const { onBackPress, onSave } = (0, react_1.useContext)(editor_1.EditorContext);
    const performCrop = (0, usePerformCrop_1.usePerformCrop)();
    const onEditDone = async () => {
        await performCrop();
        setIsEdit(true);
    };
    return (<react_native_1.View style={styles.container}>
      <IconButton_1.IconButton iconID={!isEdit ? "x" : "arrow-back"} text={!isEdit ? "Cancel" : "Back"} onPress={() => {
            onBackPress();
            setIsEdit(false);
        }}/>
      {!isEdit ? (<IconButton_1.IconButton iconID="crop" text="Crop" onPress={onEditDone}/>) : (<IconButton_1.IconButton iconID="done" text="Save" onPress={onSave}/>)}
    </react_native_1.View>);
}
exports.ControlBar = ControlBar;
const styles = react_native_1.StyleSheet.create({
    container: {
        width: "100%",
        height: 80,
        backgroundColor: "#333",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 4,
    },
});
//# sourceMappingURL=ControlBar.js.map