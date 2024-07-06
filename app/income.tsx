import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import ClickableList from '@/components/created/ClickableList'
import BudgetHeader from '@/components/created/BudgetHeader'

const Income = () => {
  return (
    <GestureHandlerRootView>
      <ScrollView style={(styles.scrollContainer)}>
        <View style={(styles.container)}>
          <BudgetHeader/>
          <View style={(styles.incomeContainer)}>
           <ClickableList/>
           <ClickableList/>
           <ClickableList/>
           <ClickableList/>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  )
}

export default Income


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
  }
})