import { View, Text, Image, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const EmptyList = ({messages}:any) => {
  return (
    <GestureHandlerRootView>
      <View style={{display:'flex', alignItems:'center',marginTop:50}}>
        
        <Image source={require('../assets/images/web.png')} style={{width:170, height:150}}/>
        <Text style={{fontSize:20, marginBottom:20, color:'#C9C9CA' }}>{messages}</Text>

      </View>
    </GestureHandlerRootView>
    
  )
}

export default EmptyList