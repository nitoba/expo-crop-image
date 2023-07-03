import { atom } from 'recoil'
import { EditorOptions } from './@types'

export const imageDataState = atom({
  key: 'imageDataState',
  default: {
    uri: '',
    width: 0,
    height: 0,
  },
})

export const imageScaleFactorState = atom({
  key: 'imageScaleFactorState',
  default: 1,
})

export const imageBoundsState = atom({
  key: 'imageBoundsState',
  default: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
})

export const readyState = atom({
  key: 'readyState',
  default: false,
})

export const processingState = atom({
  key: 'processingState',
  default: false,
})

export const accumulatedPanState = atom({
  key: 'accumulatedPanState',
  default: {
    x: 0,
    y: 0,
  },
})

export const cropSizeState = atom({
  key: 'cropSizeState',
  default: {
    width: 0,
    height: 0,
  },
})

export const editingModeState = atom({
  key: 'editingModeState',
  default: 'crop',
})

export const isEditState = atom({
  key: 'isEditState',
  default: false,
})

export const editorOptionsState = atom<EditorOptions>({
  key: 'editorOptions',
  default: {
    backgroundColor: '#222',
    overlayCropColor: '#33333355',
    gridOverlayColor: '#ffffff88',
    coverMarker: {
      show: true,
      color: '#4370d7',
    },
    controlBar: {
      position: 'top',
      height: 200,
      backgroundColor: '#000000',
      backButton: {
        iconName: 'arrow-back',
        text: 'Voltar',
        borderColor: '#000000',
        color: '#000',
        textColor: '#888888',
      },
      cropButton: {
        color: '#ffffff',
        iconName: 'crop',
        text: 'Continuar',
        borderColor: '#ffffff',
        textColor: '#ffffff',
      },
      saveButton: {
        color: '#fff',
        iconName: 'done',
        text: 'Enviar',
      },
      cancelButton: {
        color: '#000',
        textColor: '#888888',
        iconName: 'cancel',
        text: 'Refazer',
        borderColor: '#000000',
      },
    },
  },
})
