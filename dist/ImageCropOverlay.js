"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageCropOverlay = void 0;
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const recoil_1 = require("recoil");
const editor_1 = require("./context/editor");
const Store_1 = require("./Store");
const horizontalSections = ["top", "middle", "bottom"];
const verticalSections = ["left", "middle", "right"];
const ImageCropOverlay = () => {
    const [selectedFrameSection, setSelectedFrameSection] = (0, react_1.useState)("");
    const [cropSize, setCropSize] = (0, recoil_1.useRecoilState)(Store_1.cropSizeState);
    const [imageBounds] = (0, recoil_1.useRecoilState)(Store_1.imageBoundsState);
    const [accumulatedPan, setAccumulatedPan] = (0, recoil_1.useRecoilState)(Store_1.accumulatedPanState);
    const { fixedAspectRatio, minimumCropDimensions } = (0, react_1.useContext)(editor_1.EditorContext);
    const [animatedCropSize] = (0, react_1.useState)({
        width: new react_native_1.Animated.Value(cropSize.width),
        height: new react_native_1.Animated.Value(cropSize.height),
    });
    const panX = (0, react_1.useRef)(new react_native_1.Animated.Value(imageBounds.x));
    const panY = (0, react_1.useRef)(new react_native_1.Animated.Value(imageBounds.y));
    (0, react_1.useEffect)(() => {
        checkCropBounds({
            translationX: 0,
            translationY: 0,
        });
        animatedCropSize.height.setValue(cropSize.height);
        animatedCropSize.width.setValue(cropSize.width);
    }, [cropSize]);
    (0, react_1.useEffect)(() => {
        let newSize = { width: 0, height: 0 };
        const { width, height } = imageBounds;
        const imageAspectRatio = width / height;
        if (fixedAspectRatio < imageAspectRatio) {
            newSize.height = height;
            newSize.width = height * fixedAspectRatio;
        }
        else {
            newSize.width = width;
            newSize.height = width / fixedAspectRatio;
        }
        setCropSize(newSize);
    }, [imageBounds]);
    const isMovingSection = () => selectedFrameSection === "topmiddle" ||
        selectedFrameSection === "middleleft" ||
        selectedFrameSection === "middleright" ||
        selectedFrameSection === "middlemiddle" ||
        selectedFrameSection === "bottommiddle";
    const isLeft = selectedFrameSection.endsWith("left");
    const isTop = selectedFrameSection.startsWith("top");
    const onOverlayMove = ({ nativeEvent }) => {
        if (selectedFrameSection !== "") {
            if (isMovingSection()) {
                react_native_1.Animated.event([
                    {
                        translationX: panX.current,
                        translationY: panY.current,
                    },
                ], { useNativeDriver: false })(nativeEvent);
            }
            else {
                const { x, y } = getTargetCropFrameBounds(nativeEvent);
                if (isTop) {
                    panY.current.setValue(-y);
                }
                if (isLeft) {
                    panX.current.setValue(-x);
                }
                animatedCropSize.width.setValue(cropSize.width + x);
                animatedCropSize.height.setValue(cropSize.height + y);
            }
        }
        else {
            const { x, y } = nativeEvent;
            const { width: initialWidth, height: initialHeight } = cropSize;
            let position = "";
            if (y / initialHeight < 0.333) {
                position = position + "top";
            }
            else if (y / initialHeight < 0.667) {
                position = position + "middle";
            }
            else {
                position = position + "bottom";
            }
            if (x / initialWidth < 0.333) {
                position = position + "left";
            }
            else if (x / initialWidth < 0.667) {
                position = position + "middle";
            }
            else {
                position = position + "right";
            }
            setSelectedFrameSection(position);
        }
    };
    const getTargetCropFrameBounds = ({ translationX, translationY, }) => {
        let x = 0;
        let y = 0;
        if (translationX && translationY) {
            if (translationX < translationY) {
                x = (isLeft ? -1 : 1) * translationX;
                y = x / fixedAspectRatio;
            }
            else {
                y = (isTop ? -1 : 1) * translationY;
                x = y * fixedAspectRatio;
            }
        }
        return { x, y };
    };
    const onOverlayRelease = (nativeEvent) => {
        isMovingSection()
            ? checkCropBounds(nativeEvent)
            : checkResizeBounds(nativeEvent);
        setSelectedFrameSection("");
    };
    const onHandlerStateChange = ({ nativeEvent, }) => {
        if (nativeEvent.state === react_native_gesture_handler_1.State.END)
            onOverlayRelease(nativeEvent);
    };
    const checkCropBounds = ({ translationX, translationY }) => {
        let accDx = accumulatedPan.x + translationX;
        if (accDx <= imageBounds.x) {
            accDx = imageBounds.x;
        }
        else if (accDx + cropSize.width > imageBounds.width + imageBounds.x) {
            accDx = imageBounds.x + imageBounds.width - cropSize.width;
        }
        let accDy = accumulatedPan.y + translationY;
        if (accDy <= imageBounds.y) {
            accDy = imageBounds.y;
        }
        else if (accDy + cropSize.height > imageBounds.height + imageBounds.y) {
            accDy = imageBounds.y + imageBounds.height - cropSize.height;
        }
        panX.current.setValue(0);
        panY.current.setValue(0);
        setAccumulatedPan({ x: accDx, y: accDy });
    };
    const checkResizeBounds = ({ translationX, translationY }) => {
        let { width: maxWidth, height: maxHeight } = imageBounds;
        const { width: minWidth, height: minHeight } = minimumCropDimensions;
        const height = maxWidth / fixedAspectRatio;
        if (maxHeight > height)
            maxHeight = height;
        const width = maxHeight * fixedAspectRatio;
        if (maxWidth > width)
            maxWidth = width;
        const { x, y } = getTargetCropFrameBounds({ translationX, translationY });
        const animatedWidth = cropSize.width + x;
        const animatedHeight = cropSize.height + y;
        let finalHeight = animatedHeight;
        let finalWidth = animatedWidth;
        if (animatedHeight > maxHeight) {
            finalHeight = maxHeight;
            finalWidth = finalHeight * fixedAspectRatio;
        }
        else if (animatedHeight < minHeight) {
            finalHeight = minHeight;
            finalWidth = finalHeight * fixedAspectRatio;
        }
        if (animatedWidth > maxWidth) {
            finalWidth = maxWidth;
            finalHeight = maxHeight;
        }
        else if (animatedWidth < minWidth) {
            finalWidth = minWidth;
            finalHeight = finalWidth / fixedAspectRatio;
        }
        setAccumulatedPan({
            x: accumulatedPan.x + (isLeft ? -x : 0),
            y: accumulatedPan.y + (isTop ? -y : 0),
        });
        panX.current.setValue(0);
        panY.current.setValue(0);
        setCropSize({
            height: finalHeight,
            width: finalWidth,
        });
    };
    return (<react_native_1.View style={styles.container}>
      <react_native_gesture_handler_1.GestureHandlerRootView style={{ flex: 1 }}>
        {/* @ts-ignore */}
        <react_native_gesture_handler_1.PanGestureHandler onGestureEvent={onOverlayMove} onHandlerStateChange={(e) => onHandlerStateChange(e)}>
          <react_native_1.Animated.View style={[
            styles.overlay,
            animatedCropSize,
            {
                transform: [
                    { translateX: react_native_1.Animated.add(panX.current, accumulatedPan.x) },
                    { translateY: react_native_1.Animated.add(panY.current, accumulatedPan.y) },
                ],
            },
        ]}>
            {horizontalSections.map((horizontalSection) => {
            return (<react_native_1.View style={styles.sectionRow} key={horizontalSection}>
                  {verticalSections.map((verticalSection) => {
                    const key = horizontalSection + verticalSection;
                    return (<react_native_1.View style={[styles.defaultSection]} key={key}>
                        {key === "topleft" ||
                            key === "topright" ||
                            key === "bottomleft" ||
                            key === "bottomright" ? (<react_native_1.View style={[
                                styles.cornerMarker,
                                horizontalSection === "top"
                                    ? { top: -4, borderTopWidth: 7 }
                                    : { bottom: -4, borderBottomWidth: 7 },
                                verticalSection === "left"
                                    ? { left: -4, borderLeftWidth: 7 }
                                    : { right: -4, borderRightWidth: 7 },
                            ]}/>) : null}
                      </react_native_1.View>);
                })}
                </react_native_1.View>);
        })}
          </react_native_1.Animated.View>
        </react_native_gesture_handler_1.PanGestureHandler>
      </react_native_gesture_handler_1.GestureHandlerRootView>
    </react_native_1.View>);
};
exports.ImageCropOverlay = ImageCropOverlay;
const styles = react_native_1.StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        position: "absolute",
    },
    overlay: {
        height: 40,
        width: 40,
        backgroundColor: "#33333355",
        borderColor: "#ffffff88",
        borderWidth: 1,
    },
    sectionRow: {
        flexDirection: "row",
        flex: 1,
    },
    defaultSection: {
        flex: 1,
        borderWidth: 0.5,
        borderColor: "#ffffff88",
        justifyContent: "center",
        alignItems: "center",
    },
    cornerMarker: {
        position: "absolute",
        borderColor: "#ffffff",
        height: 30,
        width: 30,
    },
});
//# sourceMappingURL=ImageCropOverlay.js.map