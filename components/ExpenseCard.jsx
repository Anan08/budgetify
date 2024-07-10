import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../firebaseConfig';
import { deleteDoc, doc } from 'firebase/firestore';
import { useNavigation } from 'expo-router';

const ExpenseCard = ({ item, folderId }) => {
    const navigation = useNavigation();

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, 'expenses', folderId, 'data', item.id));
            Alert.alert('Expense deleted successfully');
            navigation.navigate('ExpenseList');
        } catch (error) {
            Alert.alert('Deleting expense error');
            console.log(error);
        }
    };

    const handleEdit = () => {
        navigation.navigate('EditExpense', { expenseId: item.id });
    };

    const handleDetail = () => {
        navigation.navigate('ExpenseDetail', { expenseId: item.id, folderId });
    };

    return (
        <View>
            <TouchableOpacity
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 10, padding: 10, borderWidth: 0.1, borderRadius: 30, height: 50 }}
                onPress={handleDetail}
            >
                <Text style={{ fontSize: 15, fontWeight: 'bold', margin: 5 }}>{item.title}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 20 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', margin: 5, color: '#E15C5D' }}>{item.amount}</Text>
                    <View>
                        <TouchableOpacity style={{ paddingTop: 3 }} onPress={handleEdit}>
                            <Ionicons name='create-outline' size={20} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={{ paddingTop: 4, paddingRight: 2 }} onPress={handleDelete}>
                            <Ionicons name='trash-outline' size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default ExpenseCard;
