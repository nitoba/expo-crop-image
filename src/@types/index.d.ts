export type ImageData = {
  uri: string
  width: number
  height: number
}

export type ImageEditorProps = {
  minimumCropDimensions?: { width: number; height: number }
  fixedAspectRatio?: number
  onEditingCancel: () => void
  onEditingComplete: (imageData: ImageData) => void
  imageUri: string | null
}

// eslint-disable-next-line no-undef
export const ImageEditor = React.FC<ImageEditorProps>
