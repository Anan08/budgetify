import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const Header = () => {
  return (
    <View style={{margin:20, display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
          <TouchableOpacity onPress={() => {
            router.push('/');
          }}>
            <Text style={{fontSize:20, fontWeight:'bold'}}>Budgetify </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{}}>
            <Ionicons name='options' size={20}/>
          </TouchableOpacity>
      </View>
  )
}

export default Header