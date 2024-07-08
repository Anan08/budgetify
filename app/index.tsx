import { View, Text, Image, TouchableOpacity, ScrollView, VirtualizedList } from 'react-native'
import React from 'react'
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import randomImage from '@/assets/images/randomImage'

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
        <View style={{margin:20, marginBottom:30, display:'flex', flex:1, flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={{fontSize:20, fontWeight:'bold'}}>Budgetify </Text>
          <TouchableOpacity style={{}}>
            <Ionicons name='options' size={20}/>
          </TouchableOpacity>
        </View>
        <View style={{margin:10, borderRadius:30 }}>
          <View style={{display:'flex', flexDirection:'row', justifyContent:'center', backgroundColor:'#507CC6', padding:10, borderRadius:30}}>
            <Image source={require('../assets/images/finance (1).png')} style={{maxHeight:300, maxWidth:300, borderRadius:30}}/>
          </View>
          <View style={{display:'flex', justifyContent:'space-between', flexDirection:'row',}}>
            <Text style={{fontSize:20, fontWeight:'bold', marginBottom:10, marginTop:10}}>Other Menus</Text>
            <TouchableOpacity>
              <Text>fdsa</Text>
            </TouchableOpacity>
          </View>
          <View style={{}}>
          <FlatList
          data={Menu}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            justifyContent:'space-between'
          }}
          renderItem={({item}) => {
            return(
              <TouchableOpacity
              onPress={() => {
                router.push(`/${item.route}`)
              }}
              style={{backgroundColor:'#F9E4E4', width:150, borderRadius:30, margin:10, padding:10}}>
                <View style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                  <Image source={randomImage()} style={{width:80, height:80}}/>
                  <Text style={{fontSize:10, fontWeight:'bold', marginTop:5}}>{item.title}</Text>
                  <Text style={{fontSize:8, fontWeight:'medium', color:'#868686', marginTop:5}}>{item.desc}</Text>
                </View>
              </TouchableOpacity>
            )
          }}
          />
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  )
}

export default Home