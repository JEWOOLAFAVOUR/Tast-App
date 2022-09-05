import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { updateTodoReducer } from '../redux/todoSlice';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CheckBox = ({ id, text, isCompleted, isToday, hour }) => {
    const dispatch = useDispatch();
    const listTodo = useSelector(state => state.todos.todos);

    const handleCheckBox = () => {
        try {
            dispatch(updateTodoReducer({ id, isCompleted }));
            AsyncStorage.setItem('@Todos', JSON.stringify(
                listTodo.map(todo => {
                    if (todo.id === id) {
                        return { ...todo, isCompleted: !todo.isCompleted }
                    }
                    return todo;
                })
            ));
            console.log('todo saved correctly');
        } catch (e) {
            console.log(e)
        }
    }

    return isToday ? (
        <TouchableOpacity onPress={handleCheckBox} style={[isCompleted ? styles.checked : styles.unChecked]}>
            {isCompleted && <Entypo name='check' size={16} color='#fafafa' />}
        </TouchableOpacity>
    ) : (
        <View style={styles.isToday} />
    )
}

export default CheckBox

const styles = StyleSheet.create({
    checked: {
        width: 20,
        height: 20,
        marginRight: 13,
        borderRadius: 6,
        backgroundColor: '#262626',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: .3,
        shadowRadius: 5,
        elevation: 5,
    },
    unChecked: {
        width: 20,
        height: 20,
        marginRight: 13,
        borderWidth: 2,
        borderColor: '#E8E9E9',
        borderRadius: 6,
        marginLeft: 15,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: .1,
        shadowRadius: 5,
        elevation: 5,
    },
    isToday: {
        width: 10,
        height: 10,
        marginHorizontal: 10,
        backgroundColor: '#262626',
        marginRight: 13,
        marginLeft: 15,
        borderRadius: 10
    },
})