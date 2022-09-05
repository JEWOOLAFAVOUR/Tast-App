import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import TodoList from '../components/TodoList';
import { todosData } from '../data/todos';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setTodosReducer, hideCompletedReducer } from '../redux/todoSlice';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
    const todos = useSelector(state => state.todos.todos)
    // console.log('this is my todos', todos)
    const navigation = useNavigation();
    // const [localDate, setLocalDate] = useState(
    //     todosData.sort((a, b) => { return a.isCompleted - b.isCompleted })
    // );
    const [isHidden, setIsHidden] = useState(false);
    const dispatch = useDispatch();

    const getTodos = async () => {
        try {
            const todos = await AsyncStorage.getItem('@Todos');
            if (todos === null) {
                dispatch(setTodosReducer(JSON.parse(todos)));
            }
        } catch (e) {
            console.log('dkdkdkdkd', e)
        }
    }

    React.useEffect(() => {
        getTodos()
    }, [])

    const handleHidePress = async () => {

        if (isHidden) {
            setIsHidden(false);
            const todos = await AsyncStorage.getItem("@Todos");
            if (todos !== null) {
                dispatch(setTodosReducer(JSON.parse(todos)));
            }
            return;
        }
        setIsHidden(true);
        dispatch(hideCompletedReducer());
        //     setIsHidden(false)
        //     setLocalDate(todosData.sort((a, b) => { return a.isCompleted - b.isCompleted }));
        //     return;
        // }
        // setIsHidden(!isHidden)
        // setLocalDate(localDate.filter(todo => !todo.isCompleted))
    }

    return (
        <>
            <StatusBar />
            <View style={styles.container}>
                <Image source={require('../assets/image.jpg')}
                    style={styles.picture} />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.title}>Today</Text>
                    <TouchableOpacity onPress={handleHidePress}>
                        <Text style={{ color: '#3478f6' }}>{isHidden ? 'Show Completed' : 'Hide Completed'}</Text>
                    </TouchableOpacity>
                </View>
                <TodoList todosData={todos.filter(todo => todo.isToday)} />
                <Text style={styles.title}>Tomorrow</Text>
                <TodoList todosData={todos.filter(todo => !todo.isToday)} />
                <TouchableOpacity style={styles.button}
                    onPress={() => navigation.navigate('AddTodo')}>
                    <Text style={styles.plus}>+</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 7,
    },
    picture: {
        width: 40,
        height: 40,
        borderRadius: 21,
        alignSelf: 'flex-end',
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 35,
        marginTop: 10
    },
    button: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#000',
        position: 'absolute',
        bottom: 50,
        right: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: .5,
        shadowRadius: 5,
        elevation: 5,
    },
    plus: {
        fontSize: 40,
        color: '#fff',
        bottom: 5,
        left: 12
    },
})