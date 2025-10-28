import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Label } from '@react-navigation/elements';

const Journal = () => {
    const [gratitudeItems, setGratitudeItems] = useState(['', '', '']);
    const [actionItems, setActionItems] = useState(['']);

    const handleInputChangeGrad = (index: number, value: string) => {
        const newGratitudeItems = [...gratitudeItems];
        newGratitudeItems[index] = value;
        setGratitudeItems(newGratitudeItems);
    };

    const handleInputChangeAction = (index: number, value: string) => {
        const newActionItems = [...actionItems];
        newActionItems[index] = value;
        setActionItems(newActionItems);
    };

    const handleSubmit = async () => {
        try {
            await AsyncStorage.setItem('gratitudeItems', JSON.stringify(gratitudeItems));
            console.log('Data saved successfully:', gratitudeItems);
            await AsyncStorage.setItem('actionItems', JSON.stringify(actionItems));
            console.log('Data saved successfully:', actionItems);
        } catch (error) {
            console.error('Failed to save data:', error);
        }
    };

    const newAction = () => {
        setActionItems([...actionItems, '']);
    };

    const handleBlur = () => {
        if (actionItems.length > 1) {
            setActionItems([...actionItems.filter(it => it != "")])
        }
    }

    const getRandomReinforcement = () => {
        return "You're doing great!";
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>What are you grateful for today?</Text>
            {gratitudeItems.map((item, index) => (
                <View key={`grad-${index}`}>
                    <TextInput
                        style={styles.input}
                        placeholder={`#${index+1}`}
                        placeholderTextColor={'white'}
                        value={item}
                        onChangeText={(value) => handleInputChangeGrad(index, value)}/>
                </View>
            ))}

            <Text style={styles.title}>What Challanges do you want to tackle today?</Text>
            {actionItems.map((item, index) => (
                <TextInput
                    key={`action-${index}`}
                    style={styles.input}
                    placeholder={`I want to..`}
                    placeholderTextColor={'white'}
                    value={item}
                    onBlur={handleBlur}
                    onChangeText={(value) => handleInputChangeAction(index, value)}/>
            ))}
            
            {actionItems.at(actionItems.length-1) != "" && <Button title="add" onPress={newAction}/>}

            <Text style={styles.title}>Positive reinforcement</Text>
            <Text style={styles.text}>{getRandomReinforcement()}</Text>

            <Button title="Ready for the Day!" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    grad: {
        color: 'white',
        flex: 1,
    },
    title: {
        color:'white',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    text: {
        color:'white',
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'white',
        color: 'white',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
    },
    btn: {
        margin: 8,
    }
});

export default Journal;