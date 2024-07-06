import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import ClickedList from '@/components/created/ClickableList'
import BudgetHeader from '@/components/created/BudgetHeader'

//
const outcome = () => {
  return (
    <GestureHandlerRootView>
      <ScrollView style={(styles.scrollContainer)}>
        <View style={(styles.container)}>
          <BudgetHeader/>
          <View style={(styles.incomeContainer)}>
           <ClickedList/>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  )
}

export default outcome

const styles = StyleSheet.create({
  scrollContainer:{
    backgroundColor:'white'
  },
  container:{
    display:'flex',
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center',
    marginTop:20
  },
  incomeContainer:{
    padding:10
  },
  incomeButton:{
    borderWidth:.5,
    width:340,
    height:60,
    borderRadius:20,
    padding:10,
    margin:10
  }

})