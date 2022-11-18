import * as ImageManipulator from "expo-image-manipulator";
import { useCallback, useEffect } from "react";
import { Modal, StatusBar, StyleSheet, View } from "react-native";
import { RecoilRoot, useRecoilState } from "recoil";
import { EditorContext } from "./context/editor";
import { ControlBar } from "./ControlBar";
import { EditingWindow } from "./EditingWindow";
import { Processing } from "./Processing";
import {
  editingModeState,
  imageDataState,
  isEditState,
  processingState,
  readyState,
} from "./Store";

type ImageData = {
  uri: string;
  width: number;
  height: number;
};

type ImageEditorCoreProps = {
  minimumCropDimensions: { width: number; height: number };
  fixedAspectRatio?: number;
  onEditingCancel: () => void;
  onEditingComplete: (imageData: ImageData) => void;
  imageUri: string | null;
};

function ImageEditorCore(props: ImageEditorCoreProps) {
  const {
    minimumCropDimensions = { width: 100, height: 100 },
    fixedAspectRatio = 0.66666666666,
    onEditingCancel,
    onEditingComplete,
    imageUri = null,
  } = props;
  const [imageData, setImageData] = useRecoilState(imageDataState);
  const [, setReady] = useRecoilState(readyState);
  const [, setEditingMode] = useRecoilState(editingModeState);
  const [, setProcessing] = useRecoilState(processingState);
  const [isEdit] = useRecoilState(isEditState);

  const initialize = useCallback(async () => {
    if (imageUri) {
      const { width: pickerWidth, height: pickerHeight } =
        await ImageManipulator.manipulateAsync(imageUri, []);

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
    } else {
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

  useEffect(() => {
    initialize().catch(console.error);
  }, [imageUri]);

  return (
    <EditorContext.Provider
      value={{
        minimumCropDimensions,
        fixedAspectRatio,
        onBackPress,
        onSave,
        imageUri,
      }}
    >
      <StatusBar hidden={true} />
      <ImageEditorView />
    </EditorContext.Provider>
  );
}

export function ImageEditorView() {
  const [ready] = useRecoilState(readyState);
  const [processing] = useRecoilState(processingState);

  return (
    <>
      {ready && (
        <View style={styles.container}>
          <ControlBar />
          <EditingWindow />
        </View>
      )}
      {processing && <Processing />}
    </>
  );
}

export function ImageEditor(props: ImageEditorCoreProps) {
  // TODO: Add support to open and close modal editor using boolean properties
  return (
    <Modal visible={true} style={styles.modalContainer}>
      <RecoilRoot>
        <ImageEditorCore {...props} />
      </RecoilRoot>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
  },
  modalContainer: {
    flex: 1,
    zIndex: 1,
  },
});
