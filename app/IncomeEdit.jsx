import { View, Text, TextInput, Image, TouchableOpacity,Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import Header from '@/components/Header';
import { incomesRef} from '@/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import CustomRadioButton from '@/components/CustomRadioButton';

const IncomeEdit = () => {
  const navigation = useNavigation();

    const { incomeId, folderId } = useLocalSearchParams();
    const [income, setIncome] = useState({});

    //setState Title, Amount, Description, Type
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    //income fetching
    const fetchIncome = async () => {
        
        try {
            const incomeDataRef = doc(incomesRef, folderId, 'data', incomeId);
            const incomeDataSnap = await getDoc(incomeDataRef);
            let incomeObj = incomeDataSnap.data();
            setIncome(incomeObj)
            
            //set data for individual field

            setTitle(incomeObj.title);
            setAmount(String(incomeObj.amount));
            setDescription(incomeObj.description);
            setCategory(incomeObj.category);
        } catch (error) {
            console.log(error);
        }
        console.log(income);
    };
    
    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = timestamp.toDate();
        return date.toLocaleDateString('en-US');
    }

    //update handling 
    const handleUpdate = async () => {
        if(title === '' || amount === '' || category == '') {
            Alert.alert("Form shouldn't be empty")
        } else {
            try {
                const currentDate = new Date();
                const numericAmount = parseFloat(amount);

                const incomeDataRef = doc(incomesRef, folderId, 'data', incomeId)
                setDoc((incomeDataRef), {
                    title : title,
                    amount : numericAmount,
                    category : category,
                    description : description,
                    date : currentDate
                })
                setTitle('');
                setAmount('');
                setDescription('');
                setCategory('');
                Alert.alert('update Income success');
                navigation.navigate('IncomeList', {folderId : folderId});
                
            } catch (error) {
                console.log(error);
            }
        }
    }


    useEffect(() => {
        fetchIncome();
    }, []);

    return (
        <GestureHandlerRootView>
          <ScrollView>
            <Header/>
            <View style={{justifyContent:'center', display:'flex', alignItems:'center', margin:20, }}>
                <Text style={{fontSize:20, fontWeight:'bold', marginBottom:10}}>Edit Income Detail</Text>
                <Image source={require('../assets/images/growth.png')} style={{height:100, width:100}}/>
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
                <View style={{display:'flex', width:300, height:50, marginBottom:40, height:190}}>
                    <Text style={{fontSize:20, fontWeight:'bold', marginBottom:10}}>Category</Text>
                    <CustomRadioButton
                        label="salary"
                        selected={category === "salary"}
                        onSelect={() => setCategory('salary')}/>
                    <CustomRadioButton
                        label="investment"
                        selected={category === "investment"}
                        onSelect={() => setCategory('investment')}/>
                    <CustomRadioButton
                        label="other"
                        selected={category === "other"}
                        onSelect={() => setCategory('other')}/>
                </View>
                <View style={{display:'flex', width:300, height:50, marginBottom:40}}>
                    <Text style={{fontSize:20, fontWeight:'bold', marginBottom:10}}>Date</Text>
                    <View style={{borderWidth:0.1, backgroundColor:'#f7f7f7', borderRadius:30, height:40, padding:10, }}>
                        <Text style={{fontSize:15, fontWeight:'400', borderWidth:0.1, paddingLeft:5}}>{formatDate(income.date)}</Text>
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

export default IncomeEdit