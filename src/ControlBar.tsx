import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { useRecoilState } from "recoil";
import { IconButton } from "./components/IconButton";
import { EditorContext } from "./context/editor";
import { usePerformCrop } from "./customHooks/usePerformCrop";
import { isEditState } from "./Store";

function ControlBar() {
  const [isEdit, setIsEdit] = useRecoilState(isEditState);
  const { onBackPress, onSave } = useContext(EditorContext);
  const performCrop = usePerformCrop();

  const onEditDone = async () => {
    await performCrop();
    setIsEdit(true);
  };

  return (
    <View style={styles.container}>
      <IconButton
        iconID={!isEdit ? "x" : "arrow-back"}
        text={!isEdit ? "Cancel" : "Back"}
        onPress={() => {
          onBackPress();
          setIsEdit(false);
        }}
      />
      {!isEdit ? (
        <IconButton iconID="crop" text="Crop" onPress={onEditDone} />
      ) : (
        <IconButton iconID="done" text="Save" onPress={onSave} />
      )}
    </View>
  );
}

export { ControlBar };

const styles = StyleSheet.create({
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
