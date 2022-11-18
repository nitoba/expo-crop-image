"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEditState = exports.editingModeState = exports.cropSizeState = exports.accumulatedPanState = exports.processingState = exports.readyState = exports.imageBoundsState = exports.imageScaleFactorState = exports.imageDataState = void 0;
const recoil_1 = require("recoil");
exports.imageDataState = (0, recoil_1.atom)({
    key: "imageDataState",
    default: {
        uri: "",
        width: 0,
        height: 0,
    },
});
exports.imageScaleFactorState = (0, recoil_1.atom)({
    key: "imageScaleFactorState",
    default: 1,
});
exports.imageBoundsState = (0, recoil_1.atom)({
    key: "imageBoundsState",
    default: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    },
});
exports.readyState = (0, recoil_1.atom)({
    key: "readyState",
    default: false,
});
exports.processingState = (0, recoil_1.atom)({
    key: "processingState",
    default: false,
});
exports.accumulatedPanState = (0, recoil_1.atom)({
    key: "accumulatedPanState",
    default: {
        x: 0,
        y: 0,
    },
});
exports.cropSizeState = (0, recoil_1.atom)({
    key: "cropSizeState",
    default: {
        width: 0,
        height: 0,
    },
});
exports.editingModeState = (0, recoil_1.atom)({
    key: "editingModeState",
    default: "crop",
});
exports.isEditState = (0, recoil_1.atom)({
    key: "isEditState",
    default: false,
});
//# sourceMappingURL=Store.js.map