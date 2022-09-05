import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Platform, TouchableOpacity } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

const Time = () => {
    const [isPickerShow, setIsPickerShow] = useState(false);
    const [date, setDate] = useState(new Date(Date.now()));

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
            {/* Display the selected date */}
            <TouchableOpacity onPress={showPicker} style={styles.pickedDateContainer}>
                <Text style={styles.pickedDate}>{date.toLocaleTimeString()}</Text>
                {/* <Text style={styles.pickedDate}>{"Current time"} - {date}</Text> */}
            </TouchableOpacity>

            {/* The date picker */}
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
    );
};
const styles = StyleSheet.create({
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
    // This only works on iOS
    datePicker: {
        width: 320,
        height: 260,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
});

export default Time;
