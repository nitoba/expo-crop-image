import { ReactNode } from 'react'

export type ImageData = {
  uri: string
  width: number
  height: number
}

type IconProps = {
  color?: string
  iconName?: string
}

export type EditorOptions = {
  backgroundColor?: string
  controlBar?: {
    position: 'top' | 'bottom'
    backgroundColor?: string
    height?: number
    cancelButton?: IconProps
    cropButton?: IconProps
    backButton?: IconProps
    saveButton?: IconProps
  }
  coverMarker?: {
    show: boolean
    color: string
  }
  borderOverlayColor?: string
  overlayCropColor?: string
}

export type ImageEditorProps = {
  editorOptions?: EditorOptions
  minimumCropDimensions?: { width: number; height: number }
  fixedAspectRatio?: number
  onEditingCancel: () => void
  onEditingComplete: (imageData: ImageData) => void
  imageUri: string | null
  processingComponent?: ReactNode
  isVisible: boolean
}

// eslint-disable-next-line no-undef
export const ImageEditor: React.FC<ImageEditorProps>
