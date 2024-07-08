import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { firestore_db } from "../firebaseConfig";
import EmptyList from '@/components/EmptyList';
import Header from '@/components/Header';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ExpenseCard from '@/components/ExpenseCard';

const Dummy = [
  {
    id:1, 
    title:"Lunch Break",
    amount:50000,
    desc:"For Lunch Break",
  },
  {
    id:2, 
    title:"Clothes",
    amount:500000,
    desc:"Clothes Shopping",
  },
  {
    id:3, 
    title:"Food",
    amount:50000,
    desc:"Yes, food is delicious",
  },
  {
    id:4, 
    title:"Hobby",
    amount:250000,
    desc:"Game is so fun",
  },

]
const ExpenseList = () => {
  const [sum, setSum] = useState(0);
  return (
    <GestureHandlerRootView>
      <Header/>
      <View>
        <Text>{sum}</Text>
      </View>
      <FlatList
      data={Dummy}
      ListEmptyComponent={<EmptyList messages="Your List's Empty :("/>}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => <ExpenseCard item={item}/>}
      />
    </GestureHandlerRootView>
  )
}

export default ExpenseList