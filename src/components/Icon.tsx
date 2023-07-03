import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type IconProps = {
  color: string
  text: string
  textColor?: string
}

export function Icon({ text, color, textColor }: IconProps) {
  return (
    <View
      style={[
        styles.container,
        {
          borderColor: color,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: textColor || color,
            fontWeight: 'bold',
          },
        ]}
      >
        {text}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    alignItems: 'center',
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 99,
    margin: 20,
    marginLeft: 10,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
})
