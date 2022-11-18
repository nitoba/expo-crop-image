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
exports.usePerformCrop = void 0;
const recoil_1 = require("recoil");
const Store_1 = require("../Store");
const ImageManipulator = __importStar(require("expo-image-manipulator"));
const react_native_1 = require("react-native");
const usePerformCrop = () => {
    const [accumulatedPan] = (0, recoil_1.useRecoilState)(Store_1.accumulatedPanState);
    const [imageBounds] = (0, recoil_1.useRecoilState)(Store_1.imageBoundsState);
    const [imageScaleFactor] = (0, recoil_1.useRecoilState)(Store_1.imageScaleFactorState);
    const [cropSize] = (0, recoil_1.useRecoilState)(Store_1.cropSizeState);
    const [, setProcessing] = (0, recoil_1.useRecoilState)(Store_1.processingState);
    const [imageData, setImageData] = (0, recoil_1.useRecoilState)(Store_1.imageDataState);
    const [, setEditingMode] = (0, recoil_1.useRecoilState)(Store_1.editingModeState);
    return async () => {
        try {
            const croppingBounds = {
                originX: Math.round((accumulatedPan.x - imageBounds.x) * imageScaleFactor),
                originY: Math.round((accumulatedPan.y - imageBounds.y) * imageScaleFactor),
                width: Math.round(cropSize.width * imageScaleFactor),
                height: Math.round(cropSize.height * imageScaleFactor),
            };
            setProcessing(true);
            const cropResult = await ImageManipulator.manipulateAsync(imageData.uri, [
                { crop: croppingBounds },
            ]);
            const { uri, width, height } = cropResult;
            setImageData({ uri, width, height });
            setProcessing(false);
            setEditingMode("operation-select");
        }
        catch (error) {
            setProcessing(false);
            react_native_1.Alert.alert("An error occurred while editing.");
        }
    };
};
exports.usePerformCrop = usePerformCrop;
//# sourceMappingURL=usePerformCrop.js.map