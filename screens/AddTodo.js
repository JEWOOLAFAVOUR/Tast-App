import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Switch, TouchableOpacity } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker'
import DateTimePickerAndroid from '@react-native-community/datetimepicker';


const AddTodo = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date());
    const [isToday, setIsToday] = useState(false);
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
                {/* <DateTimePickerAndroid
                    value={date}
                    mode={'time'}
                    is24Hour={true}
                    onChange={(event, selectedDate) => setDate(selectedDate)}
                    style={{ width: '80%' }}
                /> */}
            </View>
            <View style={styles.inputCtn}>
                <Text style={styles.inputTitle}>Today</Text>
                <Switch
                    value={isToday}
                    onValueChange={(value) => setIsToday(value)}
                />
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={{ color: '#fff' }}>Done</Text>
            </TouchableOpacity>
            <Text style={{ color: '#00000068' }}>If you disable today, the task will be considered as tommorrow</Text>
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
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingBottom: 30
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
})