import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useRecoilState, useRecoilValue } from 'recoil'
import { IconButton } from './components/IconButton'
import { EditorContext } from './context/editor'
import { usePerformCrop } from './customHooks/usePerformCrop'
import { editorOptionsState, isEditState } from './Store'

function ControlBar() {
  const [isEdit, setIsEdit] = useRecoilState(isEditState)
  const { controlBar } = useRecoilValue(editorOptionsState)
  const { onBackPress, onSave } = useContext(EditorContext)
  const performCrop = usePerformCrop()

  const onEditDone = async () => {
    await performCrop()
    setIsEdit(true)
  }
  console.log('ControlBar', isEdit)
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: controlBar?.backgroundColor,
          height: controlBar?.height,
        },
      ]}
    >
      <View>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16,
            top: 0,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          Ações rápidas
        </Text>
        <Text
          style={{
            color: 'white',
          }}
        >
          {!isEdit
            ? `Use os controles na tela para ajustar a área de recorte conforme desejado`
            : `Envie o exercício realizado para realizar o diagnóstico da execução`}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          width: '100%',
        }}
      >
        <IconButton
          color={
            !isEdit
              ? controlBar?.cancelButton?.color!
              : controlBar?.backButton?.color!
          }
          text={
            !isEdit
              ? controlBar?.cancelButton?.text!
              : controlBar?.backButton?.text!
          }
          textColor={
            !isEdit
              ? controlBar?.cancelButton?.textColor!
              : controlBar?.backButton?.textColor!
          }
          onPress={() => {
            onBackPress()
            setIsEdit(false)
          }}
        />
        {!isEdit ? (
          <IconButton
            text={controlBar?.cropButton?.text!}
            color={controlBar?.cropButton?.color!}
            onPress={onEditDone}
          />
        ) : (
          <IconButton
            text={controlBar?.saveButton?.text!}
            color={controlBar?.saveButton?.color!}
            onPress={onSave}
          />
        )}
      </View>
    </View>
  )
}

export { ControlBar }

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 4,
    justifyContent: 'flex-start',
    height: 150,
  },
})
