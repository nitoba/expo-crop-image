import { Feather, MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export type MaterialIconIDs = React.ComponentProps<typeof MaterialIcons>['name']
export type FeatherIconIDs = React.ComponentProps<typeof Feather>['name']

type IconProps = {
  text: string
  iconID: MaterialIconIDs | FeatherIconIDs
}

export function Icon(props: IconProps) {
  return (
    <View style={styles.container}>
      {props.iconID === 'x' ? (
        <Feather name={props.iconID} size={26} color={'white'} />
      ) : (
        <MaterialIcons
          name={props.iconID as MaterialIconIDs}
          size={26}
          color={'white'}
        />
      )}
      <Text style={styles.text}>{props.text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    width: 80,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
})
