import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useState } from 'react'

const ClickableList = () => {
  return (
    <TouchableOpacity style={(styles.incomeButton)}>
      <View style={{}}>
        <Text>Left</Text>
      </View>
      <View style={(styles.rightButton)}>
        <TouchableOpacity>
          <Text style={{color:'white', marginTop:3, marginLeft:13, fontSize:13}}>Edit</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

export default ClickableList

const styles = StyleSheet.create({
  incomeButton:{
    display:'flex',
    borderWidth:.5,
    width:340,
    height:60,
    borderRadius:20,
    padding:10,
    margin:10,
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
    zIndex:1
  },
  rightButton:{
    marginTop:15,
    marginRight:10,
    zIndex:100,
    backgroundColor:'black',
    borderRadius:10,
    width:50,
    height:25
  }
})