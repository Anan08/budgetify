import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import Header from '@/components/Header';
import { db, expensesRef} from '@/firebaseConfig';
import { doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import CustomRadioButton from '@/components/CustomRadioButton';

const ExpenseEdit = () => {

    const navigation = useNavigation();

    const { expenseId, folderId } = useLocalSearchParams();
    const [expense, setExpense] = useState({});

    //setState Title, Amount, Description, Type
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    //expenses fetching
    const fetchExpenses = async () => {
        
        try {
            const expenseDataRef = doc(expensesRef, folderId, 'data', expenseId);
            const expenseDataSnap = await getDoc(expenseDataRef);
            let expenseObj = expenseDataSnap.data();
            setExpense(expenseObj);
            
            //set data for individual field
            setTitle(expenseObj.title);
            setAmount(String(expenseObj.amount));
            setDescription(expenseObj.description);
            setCategory(expenseObj.category);
        } catch (error) {
            console.log(error);
        }
        console.log(expense);
    };
    
    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = timestamp.toDate();
        return date.toLocaleDateString('en-US');
    }

    //update handling
    const handleUpdate = async () => {
        if(title === '' || amount === '' || category === '') {
            Alert.alert("Form shouldn't be empty")
        } else {
            try {
                const currentDate = new Date();
                const numericAmount = parseFloat(amount);

                const  expensesDataRef = doc(expensesRef, folderId, 'data', expenseId);
                setDoc((expensesDataRef), {
                    title : title,
                    amount : numericAmount,
                    category : category,
                    description : description,
                    date : currentDate
                });

                setTitle('');
                setAmount('');
                setDescription('');
                setCategory('');
                Alert.alert('updating expenses success');
                navigation.navigate('ExpenseList', {folderId : folderId});
                
            } catch (error) {
                console.log(error);
            }
        }
    }


    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <GestureHandlerRootView>
            <ScrollView>
                <Header/>
                <View style={{justifyContent:'center', display:'flex', alignItems:'center', margin:20, }}>
                    <Text style={{fontSize:20, fontWeight:'bold', marginBottom:10}}>Edit Expense Detail</Text>
                    <Image source={require('../assets/images/payment.png')} style={{height:100, width:100}}/>
                </View>

                <View style={{display:'flex', justifyContent:'center', alignItems:'center', margin:20}}>
                    <View style={{display:'flex', width:300, height:50, marginBottom:40}}>
                        <Text style={{fontSize:20, fontWeight:'bold', marginBottom:10}}>Title</Text>
                        <View style={{borderWidth:0.1, backgroundColor:'#f7f7f7', borderRadius:30, height:40, padding:10, }}>
                            <TextInput 
                            style={{fontSize:15, fontWeight:'400', borderWidth:0.1, paddingLeft:5}}
                            value={title}
                            onChangeText={(title) => {setTitle(title)}}
                            defaultValue={title}
                            />
                        </View>
                        
                    </View>
                    <View style={{display:'flex', width:300, height:50, marginBottom:40}}>
                        <Text style={{fontSize:20, fontWeight:'bold', marginBottom:10}}>Amount</Text>
                        <View style={{borderWidth:0.1, backgroundColor:'#f7f7f7', borderRadius:30, height:40, padding:10, }}>
                            <TextInput 
                            style={{fontSize:15, fontWeight:'400', borderWidth:0.1, paddingLeft:5}}
                            value={amount}
                            keyboardType='numeric'
                            onChangeText={(amount) => {setAmount(amount)}}
                            defaultValue={amount}
                            />
                        </View>
                        
                    </View>
                    <View style={{display:'flex', width:300, height:50, marginBottom:40}}>
                        <Text style={{fontSize:20, fontWeight:'bold', marginBottom:10}}>Description</Text>
                        <View style={{borderWidth:0.1, backgroundColor:'#f7f7f7', borderRadius:30, height:40, padding:10, }}>
                            <TextInput 
                            style={{fontSize:15, fontWeight:'400', borderWidth:0.1, paddingLeft:5}}
                            value={description}
                            onChangeText={(description) => {setDescription(description)}}
                            defaultValue={description}
                            />
                        </View>
                        
                    </View>
                    <View style={{display:'flex', width:300, height:50, marginBottom:40, height:300}}>
                        <Text style={{fontSize:20, fontWeight:'bold', marginBottom:10}}>Category</Text>
                        <CustomRadioButton
                            label="fashion"
                            selected={category === "fashion"}
                            onSelect={() => setCategory('fashion')}/>
                        <CustomRadioButton
                            label="food"
                            selected={category === "food"}
                            onSelect={() => setCategory('food')}/>
                        <CustomRadioButton
                            label="hobby"
                            selected={category === "hobby"}
                            onSelect={() => setCategory('hobby')}/>
                        <CustomRadioButton
                            label="daily"
                            selected={category === "daily"}
                            onSelect={() => setCategory('daily')}/>
                        <CustomRadioButton
                            label="other"
                            selected={category === "other"}
                            onSelect={() => setCategory('other')}/>
                    </View>
                    <View style={{display:'flex', width:300, height:50, marginBottom:40}}>
                        <Text style={{fontSize:20, fontWeight:'bold', marginBottom:10}}>Date</Text>
                        <View style={{borderWidth:0.1, backgroundColor:'#f7f7f7', borderRadius:30, height:40, padding:10, }}>
                            <Text style={{fontSize:15, fontWeight:'400', borderWidth:0.1, paddingLeft:5}}>{formatDate(expense.date)}</Text>
                        </View>
                        
                    </View>

                    <View style={{marginTop:40}}>
                        <TouchableOpacity 
                        style={{width:300, display:'flex', alignItems:'center', backgroundColor:'#62B865', padding:10, borderRadius:30}}
                        onPress={handleUpdate}>
                            <Text style={{color:'white', fontWeight:'bold'}}>Save</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </GestureHandlerRootView>
        
        )
}

export default ExpenseEdit