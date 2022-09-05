import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Switch, TouchableOpacity, Platform } from 'react-native';
import Time from '../components/time';

import { useDispatch, useSelector } from 'react-redux';
import { addTodoReducer } from '../redux/todoSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddTodo = () => {
    const [isPickerShow, setIsPickerShow] = useState(false);
    const [date, setDate] = useState(new Date(Date.now()));
    const [name, setName] = useState('');
    // const [date, setDate] = useState(new Date());
    const [isToday, setIsToday] = useState(false);
    const listTodos = useSelector(state => state.todos.todos);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const addTodo = async () => {
        const newTodo = {
            id: Math.floor(Math.random() * 1000000),
            text: name,
            hour: date.toString(),
            isToday: isToday,
            isCompleted: false,
        }
        try {
            await AsyncStorage.setItem("@Todos", JSON.stringify([...listTodos, newTodo]));
            dispatch(addTodoReducer(newTodo));
            console.log('Todo saved correctly');
            navigation.goBack()
        } catch (e) {
            console.log(e)
        }
    }

    const showPicker = () => {
        setIsPickerShow(true);
    };

    const onChange = (event, value) => {
        setDate(value);
        if (Platform.OS === 'android') {
            setIsPickerShow(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Task</Text>
            <View style={styles.inputCtn}>
                <Text style={styles.inputTitle}>Name</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='Add task'
                    placeholderTextColor='#00000030'
                    onChangeText={(text) => setName(text)}
                />
            </View>
            <View style={styles.inputCtn}>
                <Text style={styles.inputTitle}>Hour</Text>
                {/* /////////////////////////////////////////////////////////////////////// */}
                <View>
                    <TouchableOpacity onPress={showPicker} style={styles.pickedDateContainer}>
                        <Text style={styles.pickedDate}>{date.toLocaleTimeString()}</Text>
                    </TouchableOpacity>
                    {isPickerShow && (
                        <DateTimePicker
                            value={date}
                            mode={'time'}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            is24Hour={true}
                            onChange={onChange}
                            style={styles.datePicker}
                        />
                    )}
                </View>

                {/* <Time /> */}
            </View>
            <View style={styles.inputCtn}>
                <Text style={styles.inputTitle}>Today</Text>
                <Switch
                    value={isToday}
                    onValueChange={(value) => setIsToday(value)}
                />
            </View>
            <TouchableOpacity onPress={addTodo} style={styles.button}>
                <Text style={{ color: '#fff' }}>Done</Text>
            </TouchableOpacity>
            <Text style={{ color: '#00000068' }}>If you disable today, the task will be considered as tommorrow.</Text>
        </View>
    )
}

export default AddTodo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        backgroundColor: '#f7f8fa',
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 35,
        marginTop: 10,
    },
    inputTitle: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 24
    },
    textInput: {
        borderBottomColor: '#00000030',
        borderBottomWidth: 1,
        width: '80%',
    },
    inputCtn: {
        flexDirection: 'row',
        paddingBottom: 30,
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    button: {
        marginTop: 30,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        height: 46,
        borderRadius: 11,
    },

    pickedDateContainer: {
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 10,
    },
    pickedDate: {
        fontSize: 18,
        color: 'black',
    },
    btnContainer: {
        padding: 30,
    },
})