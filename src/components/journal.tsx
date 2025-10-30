import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActionSheetIOS } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HelloWave } from './hello-wave';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import JournalEntry from '../model/JournalEntry';

const Journal = () => {
    const [currentEntry, setCurrentEntry] = useState({
        id: Date.now(),
        graditudes: [''],
        actions: [''],
        good: '',
        learning: '',
        highlights: ['']
    });

    const addEntry = () => {
        const newEntry = new JournalEntry (
            currentEntry.id,
            currentEntry.graditudes,
            currentEntry.actions,
            currentEntry.good,
            currentEntry.learning,
            currentEntry.highlights
        );

        // Resetting currentEntry after adding
        setCurrentEntry({
            id: Date.now(),
            graditudes: [''],
            actions: [''],
            good: '',
            learning: '',
            highlights: ['']
        });
    };

    const [gratitudeItems, setGratitudeItems] = useState(['', '', '']);
    const [actionItems, setActionItems] = useState(['']);
    const [highlightItems, setHighlightItems] = useState(['']);
    const [goodDeed, setGoodDeed] = useState('')
    const [learning, setLearning] = useState('')
    const [focus, setFocus] = useState('')


    const handleInputChangeGrad = (index: number, value: string) => {
        const newGratitudeItems = [...currentEntry.graditudes];
        newGratitudeItems[index] = value;
        setGratitudeItems(newGratitudeItems);
    };

    const handleInputChangeAction = (index: number, value: string) => {
        const newActionItems = [...actionItems];

        newActionItems[index] = value;
        if (newActionItems[newActionItems.length-1]!= "") {
            newActionItems.push('');
        }
        setActionItems(newActionItems);
    };

    const handleInputChangeHighlight= (index: number, value: string) => {
        const newHighlightItems = [...highlightItems];

        newHighlightItems[index] = value;
        if (newHighlightItems[newHighlightItems.length-1]!= "") {
            newHighlightItems.push('');
        }
        setHighlightItems(newHighlightItems);
    };

    const handleSubmitMorning = async () => {
        try {
            await AsyncStorage.setItem('gratitudeItems', JSON.stringify(gratitudeItems));
            console.log('Data saved successfully:', gratitudeItems);
            actionItems.pop();
            await AsyncStorage.setItem('actionItems', JSON.stringify(actionItems));
            console.log('Data saved successfully:', actionItems);
            setActionItems([...actionItems, ''])
        } catch (error) {
            console.error('Failed to save data:', error);
        }
    };

    const handleSubmitEvening = async () => {
        try {
            await AsyncStorage.setItem('goodDeed', JSON.stringify(goodDeed));
            console.log('Data saved successfully:', goodDeed);
            await AsyncStorage.setItem('learning', JSON.stringify(learning));
            console.log('Data saved successfully:', learning);
            highlightItems.pop();
            await AsyncStorage.setItem('highlightItems', JSON.stringify(highlightItems));
            setHighlightItems([...highlightItems, ''])
            console.log('Data saved successfully:', highlightItems);
        } catch (error) {
            console.error('Failed to save data:', error);
        }
    };

    const handleBlurAction = () => {
        const last = actionItems[actionItems.length-1];

        if (actionItems.length > 1) {
            setActionItems([...actionItems.filter(it => it != ""), last])
        }
        handleBlur();
    }

    const handleBlurHighlight = () => {
        const last = highlightItems[highlightItems.length-1]
        if (highlightItems.length > 1) {
            setHighlightItems([...highlightItems.filter(it => it != ""), last])
        }
        handleBlur();
    }

    const handleBlur = () => {
        setFocus('');        
    }

    const handleFocus = (value: string) => {
        setFocus(value)
    }


    const getRandomReinforcement = () => {
        return "You're doing great!";
    }

    return (
        <View style={styles.container}>
            <View>
                <ThemedView style={styles.titleContainer}>
                    <ThemedText type="title">Good Morning!</ThemedText>
                    <HelloWave />
                </ThemedView>
                {(focus=='' || focus=='grad') && 
                    <View
                        onFocus={() => {handleFocus("grad")}}
                        onBlur={handleBlur}>
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
                    </View>
                }
                {(focus=='' || focus=='action') && 
                    <View
                        onFocus={() => {handleFocus("action")}}
                        onBlur={handleBlurAction}>
                        <Text style={styles.title}>What Challanges do you want to tackle today?</Text>
                        {actionItems.map((item, index) => (
                            <TextInput
                                key={`action-${index}`}
                                style={styles.input}
                                placeholder={`I want to ..`}
                                placeholderTextColor={'white'}
                                value={item}
                                onChangeText={(value) => handleInputChangeAction(index, value)}/>
                        ))}
                    </View>
                }
                
                {(focus=='') && 
                    <View>
                        <Button title="Ready for the Day!" onPress={handleSubmitMorning} />

                        <Text style={[styles.title, {marginVertical: 20}]}>Positive reinforcement</Text>
                        <Text style={styles.text}>{getRandomReinforcement()}</Text>
                    </View>
                }
            </View>
            <View>
                {(focus=='' || focus=='good') && 
                    <View
                        onFocus={() => {handleFocus("good")}}
                        onBlur={handleBlur}>
                        <Text style={styles.title}>Good deed of the day</Text>
                        <TextInput
                                style={styles.input}
                                placeholder={`I did ..`}
                                placeholderTextColor={'white'}
                                value={goodDeed}
                                onChangeText={(value) => setGoodDeed(value)}/>
                    </View>
                }

                {(focus=='' || focus=='learning') && 
                    <View
                        onFocus={() => {handleFocus("learning")}}
                        onBlur={handleBlur}>
                        <Text style={styles.title}>Learning</Text>
                        <TextInput
                                style={styles.input}
                                placeholder={`I learned ..`}
                                placeholderTextColor={'white'}
                                value={learning}        
                                onChangeText={(value) => setLearning(value)}/>
                    </View>
                }
                {(focus=='' || focus=='highlight') && 
                    <View
                        onFocus={() => {handleFocus("highlight")}}
                        onBlur={handleBlurHighlight}>
                        <Text style={styles.title}>Highlights</Text>
                        {highlightItems.map((item, index) => (
                            <TextInput
                                key={`highlight-${index}`}
                                style={styles.input}
                                placeholder={`I want to ..`}
                                placeholderTextColor={'white'}
                                value={item}        
                                onChangeText={(value) => handleInputChangeHighlight(index, value)}/>
                        ))}
                    </View>
                }
                
                {(focus=='') && 
                    <View style={{marginBottom:20}}>
                        <Button title="Ready to Rest!" onPress={handleSubmitEvening} />
                    </View>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        margin: 15,
        justifyContent: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
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
        padding: 0,
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
    },
    btn: {
        margin: 8,
    }
});

export default Journal;