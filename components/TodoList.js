import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Todo from './Todo';

const TodoList = ({ todosData }) => {
    return (
        <FlatList
            data={todosData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Todo {...item} />}
        />
    )
}

export default TodoList

const styles = StyleSheet.create({})