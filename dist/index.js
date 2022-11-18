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
exports.ImageEditor = exports.ImageEditorView = void 0;
const ImageManipulator = __importStar(require("expo-image-manipulator"));
const react_1 = require("react");
const react_native_1 = require("react-native");
const recoil_1 = require("recoil");
const editor_1 = require("./context/editor");
const ControlBar_1 = require("./ControlBar");
const EditingWindow_1 = require("./EditingWindow");
const Processing_1 = require("./Processing");
const Store_1 = require("./Store");
function ImageEditorCore(props) {
    const { minimumCropDimensions = { width: 100, height: 100 }, fixedAspectRatio = 0.66666666666, onEditingCancel, onEditingComplete, imageUri = null, } = props;
    const [imageData, setImageData] = (0, recoil_1.useRecoilState)(Store_1.imageDataState);
    const [, setReady] = (0, recoil_1.useRecoilState)(Store_1.readyState);
    const [, setEditingMode] = (0, recoil_1.useRecoilState)(Store_1.editingModeState);
    const [, setProcessing] = (0, recoil_1.useRecoilState)(Store_1.processingState);
    const [isEdit] = (0, recoil_1.useRecoilState)(Store_1.isEditState);
    const initialize = (0, react_1.useCallback)(async () => {
        if (imageUri) {
            const { width: pickerWidth, height: pickerHeight } = await ImageManipulator.manipulateAsync(imageUri, []);
            setImageData({
                uri: imageUri,
                width: pickerWidth,
                height: pickerHeight,
            });
            setReady(true);
        }
    }, []);
    const onBackPress = () => {
        if (!isEdit) {
            onEditingCancel();
        }
        else {
            setProcessing(true);
            initialize().then(() => {
                setEditingMode("crop");
                setProcessing(false);
            });
        }
    };
    const onSave = () => {
        onEditingComplete(imageData);
    };
    (0, react_1.useEffect)(() => {
        initialize().catch(console.error);
    }, [imageUri]);
    return (<editor_1.EditorContext.Provider value={{
            minimumCropDimensions,
            fixedAspectRatio,
            onBackPress,
            onSave,
            imageUri,
        }}>
      <react_native_1.StatusBar hidden={true}/>
      <ImageEditorView />
    </editor_1.EditorContext.Provider>);
}
function ImageEditorView() {
    const [ready] = (0, recoil_1.useRecoilState)(Store_1.readyState);
    const [processing] = (0, recoil_1.useRecoilState)(Store_1.processingState);
    return (<>
      {ready && (<react_native_1.View style={styles.container}>
          <ControlBar_1.ControlBar />
          <EditingWindow_1.EditingWindow />
        </react_native_1.View>)}
      {processing && <Processing_1.Processing />}
    </>);
}
exports.ImageEditorView = ImageEditorView;
function ImageEditor(props) {
    // TODO: Add support to open and close modal editor using boolean properties
    return (<react_native_1.Modal visible={true} style={styles.modalContainer}>
      <recoil_1.RecoilRoot>
        <ImageEditorCore {...props}/>
      </recoil_1.RecoilRoot>
    </react_native_1.Modal>);
}
exports.ImageEditor = ImageEditor;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222",
    },
    modalContainer: {
        flex: 1,
        zIndex: 1,
    },
});
//# sourceMappingURL=index.js.map