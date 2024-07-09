import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'


const ExpenseCard = ({item}:any) => {
  return (
    <>
      <View>
          <TouchableOpacity style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10, padding:10, borderWidth:0.1, borderRadius:30, height:50}}>
              <Text style={{fontSize:15, fontWeight:'bold', margin:5}}>{item.title}</Text>
              <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', gap:10}}>
                <Text style={{fontSize:15, fontWeight:'normal', margin:5, color:'#E15C5D'}}>{item.amount}</Text>
                <TouchableOpacity style={{ padding:5}}>
                  <Ionicons name='ellipsis-vertical-outline' size={20}/>
                </TouchableOpacity>
                
              </View>
          </TouchableOpacity>
      </View>
    </>
  )
}

export default ExpenseCard