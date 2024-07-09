import { View, Text, Image, TouchableOpacity, ScrollView, VirtualizedList } from 'react-native'
import React from 'react'
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import randomImage from '@/assets/images/randomImage'
import Header from '@/components/Header'
import * as Icons from 'react-native-heroicons/outline'

const Menu = [
  {
    id : 1,
    title: "Add Expense",
    desc: "Add your new Expense",
    route: "AddExpense"
  },
  {
    id : 2,
    title: "Add Income",
    desc: "Add your Income",
    route: "AddIncome"
  },
  {
    id : 3,
    title: "Currency Check",
    desc: "Check Today's Currency",
    route: "CurrencyCheck"
  },
  {
    id : 4,
    title: "Expense List",
    desc: "See your expense",
    route: "ExpenseList"
  }
]

const Home = () => {
  return (
    <GestureHandlerRootView>
      <ScrollView>
        <Header/>
        <View style={{margin:20, borderRadius:30 }}>
          <View style={{display:'flex', flexDirection:'row', justifyContent:'center', backgroundColor:'#507CC6', padding:10, borderRadius:30}}>
            <Image source={require('../assets/images/finance (1).png')} style={{maxHeight:300, maxWidth:300, borderRadius:30}}/>
          </View>
          <View style={{display:'flex', justifyContent:'space-between', flexDirection:'row',}}>
            <Text style={{fontSize:20, fontWeight:'bold', marginTop:10}}>Other Menus</Text>
            <TouchableOpacity>
              <Text></Text>
            </TouchableOpacity>
          </View>
          <View style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
            <View>
            <View style={{display:'flex', alignItems:'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    router.push(`/AddExpense`)
                  }}
                  style={{backgroundColor:'#F7F7F7', borderRadius:10, margin:10, padding:10, width:60, height:60}}>
                    <View style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                      <Ionicons name='remove-outline' size={35} color={"#000"}/>
                    </View>
                </TouchableOpacity>
                <Text style={{fontSize:10}}>Add Expense</Text>
              </View>
              <View style={{display:'flex', alignItems:'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    router.push(`/AddIncome`)
                  }}
                  style={{backgroundColor:'#F7F7F7', borderRadius:10, margin:10, padding:10, width:60, height:60}}>
                    <View style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                      <Ionicons name='add-outline' size={35} color={"#000"}/>
                    </View>
                </TouchableOpacity>
                <Text style={{fontSize:10}}>Add Income</Text>
              </View>
            </View>
            <View>
              <View style={{display:'flex', alignItems:'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    router.push(`/ExpenseList`)
                  }}
                  style={{backgroundColor:'#F7F7F7', borderRadius:10, margin:10, padding:10, width:60, height:60}}>
                    <View style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                      <Ionicons name='list-outline' size={35} color={"#000"}/>
                    </View>
                </TouchableOpacity>
                <Text style={{fontSize:10}}>Outcome List</Text>
              </View>

              <View style={{display:'flex', alignItems:'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    router.push(`/ExpenseList`)
                  }}
                  style={{backgroundColor:'#F7F7F7', borderRadius:10, margin:10, padding:10, width:60, height:60}}>
                    <View style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                      <Ionicons name='cash-outline' size={35} color={"#000"}/>
                    </View>
                </TouchableOpacity>
                <Text style={{fontSize:10}}>Currency Rate</Text>
              </View>
            </View>
            <View>
            <View style={{display:'flex', alignItems:'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    router.push(`/ExpenseList`)
                  }}
                  style={{backgroundColor:'#F7F7F7', borderRadius:10, margin:10, padding:10, width:60, height:60}}>
                    <View style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                      <Ionicons name='camera-outline' size={35} color={"#000"}/>
                    </View>
                </TouchableOpacity>
                <Text style={{fontSize:10}}>Camera</Text>
              </View>

              <View style={{display:'flex', alignItems:'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    router.push(`/ExpenseList`)
                  }}
                  style={{backgroundColor:'#F7F7F7', borderRadius:10, margin:10, padding:10, width:60, height:60}}>
                    <View style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                      <Ionicons name='reorder-four-outline' size={35} color={"#000"}/>
                    </View>
                </TouchableOpacity>
                <Text style={{fontSize:10}}>More..</Text>
              </View>

            </View>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  )
}

export default Home