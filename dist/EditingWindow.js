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
exports.EditingWindow = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const recoil_1 = require("recoil");
const ImageCropOverlay_1 = require("./ImageCropOverlay");
const Store_1 = require("./Store");
function EditingWindow() {
    const [imageLayout, setImageLayout] = (0, react_1.useState)(null);
    const [imageData] = (0, recoil_1.useRecoilState)(Store_1.imageDataState);
    const [, setImageBounds] = (0, recoil_1.useRecoilState)(Store_1.imageBoundsState);
    const [, setImageScaleFactor] = (0, recoil_1.useRecoilState)(Store_1.imageScaleFactorState);
    const [editingMode] = (0, recoil_1.useRecoilState)(Store_1.editingModeState);
    const isCropping = editingMode === "crop";
    const getImageFrame = (layout) => {
        onUpdateCropLayout(layout);
    };
    const onUpdateCropLayout = (layout) => {
        if (layout) {
            const editingWindowAspectRatio = layout.height / layout.width;
            const imageAspectRatio = imageData.height / imageData.width;
            let bounds = { x: 0, y: 0, width: 0, height: 0 };
            let imageScaleFactor = 1;
            if (imageAspectRatio > editingWindowAspectRatio) {
                bounds.x =
                    (((imageAspectRatio - editingWindowAspectRatio) / imageAspectRatio) *
                        layout.width) /
                        2;
                bounds.width = layout.height / imageAspectRatio;
                bounds.height = layout.height;
                imageScaleFactor = imageData.height / layout.height;
            }
            else {
                bounds.y =
                    (((1 / imageAspectRatio - 1 / editingWindowAspectRatio) /
                        (1 / imageAspectRatio)) *
                        layout.height) /
                        2;
                bounds.width = layout.width;
                bounds.height = layout.width * imageAspectRatio;
                imageScaleFactor = imageData.width / layout.width;
            }
            setImageBounds(bounds);
            setImageScaleFactor(imageScaleFactor);
            setImageLayout({
                height: layout.height,
                width: layout.width,
            });
        }
    };
    (0, react_1.useEffect)(() => {
        onUpdateCropLayout(imageLayout);
    }, [imageData]);
    return (<react_native_1.View style={styles.container}>
      <react_native_1.Image style={styles.image} source={{ uri: imageData.uri }} onLayout={({ nativeEvent }) => getImageFrame(nativeEvent.layout)}/>
      {isCropping && imageLayout != null ? <ImageCropOverlay_1.ImageCropOverlay /> : null}
    </react_native_1.View>);
}
exports.EditingWindow = EditingWindow;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        resizeMode: "contain",
    },
    glContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
//# sourceMappingURL=EditingWindow.js.map