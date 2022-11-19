import { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { ImageEditor } from 'expo-crop-image'

export default function App() {
  const [image, setImage] = useState('')
  const [showEditor, setShowEditor] = useState(false)

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  return (
    <>
      <ImageEditor
        isVisible={showEditor}
        fixedAspectRatio={1}
        onEditingCancel={() => setShowEditor(false)}
        onEditingComplete={(image) => {
          setShowEditor(false)
          setImage(image.uri)
        }}
        imageUri={image}
      />

      <View style={styles.container}>
        {image ? (
          <View>
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={{ uri: image }}
                style={styles.imagePlaceholder}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowEditor(true)}
            >
              <Text style={styles.text}>Edit</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.imagePlaceholder} onPress={pickImage}>
            <Feather name="plus" size={50} color="#121214" />
          </TouchableOpacity>
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: '#f2f2f2',
    borderWidth: 2,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#555',
    borderRadius: 8,
    marginTop: 24,
    alignItems: 'center',
  },
  text: {
    color: '#f7f7f7',
    fontWeight: '500',
  },

  loading: {
    color: '#f7f7f7',
    fontSize: 32,
    padding: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'red',
  },
})
