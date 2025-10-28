import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Label } from '@react-navigation/elements';

const Journal = () => {
    const [gratitudeItems, setGratitudeItems] = useState(['', '', '']);
    const [actionItems, setActionItems] = useState(['']);
    const [hightlightItems, setHightlightItems] = useState(['']);
    const [goodDeed, setGoodDeed] = useState('')
    const [learning, setLearning] = useState('')
    const [focus, setFocus] = useState('')

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

    const handleInputChangeHightlight= (index: number, value: string) => {
        const newHightlightItems = [...actionItems];
        newHightlightItems[index] = value;
        setActionItems(newHightlightItems);
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

    const newHightlight = () => {
        setHightlightItems([...actionItems, '']);
    };

    const handleBlurAction = () => {
        if (actionItems.length > 1) {
            setActionItems([...actionItems.filter(it => it != "")])
        }
        handleBlur();
    }

    const handleBlurHightlight = () => {
        if (actionItems.length > 1) {
            setHightlightItems([...hightlightItems.filter(it => it != "")])
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
            {(focus=='' || focus=='grad') && 
                <View>
                    <Text style={styles.title}>What are you grateful for today?</Text>
                    {gratitudeItems.map((item, index) => (
                        <View key={`grad-${index}`}>
                            <TextInput
                                style={styles.input}
                                placeholder={`#${index+1}`}
                                placeholderTextColor={'white'}
                                value={item}
                                onFocus={() => {handleFocus("grad")}}
                                onChangeText={(value) => handleInputChangeGrad(index, value)}/>
                        </View>
                    ))}
                </View>
            }
            {(focus=='' || focus=='action') && 
                <View>
                    <Text style={styles.title}>What Challanges do you want to tackle today?</Text>
                    {actionItems.map((item, index) => (
                        <TextInput
                            key={`action-${index}`}
                            style={styles.input}
                            placeholder={`I want to ..`}
                            placeholderTextColor={'white'}
                            value={item}
                            onFocus={() => {handleFocus("action")}}
                            onBlur={handleBlurAction}
                            onChangeText={(value) => handleInputChangeAction(index, value)}/>
                    ))}

                
                    {actionItems.at(actionItems.length-1) != "" && <Button title="add" onPress={newAction}/>}
                </View>
            }
            
            {(focus=='') && 
                <View>
                    <Text style={styles.title}>Positive reinforcement</Text>
                    <Text style={styles.text}>{getRandomReinforcement()}</Text>
                
                    <Button title="Ready for the Day!" onPress={handleSubmit} />
                </View>
            }

            {(focus=='' || focus=='good') && 
                <View>
                    <Text style={styles.title}>Good deed of the day</Text>
                    <TextInput
                            style={styles.input}
                            placeholder={`I did ..`}
                            placeholderTextColor={'white'}
                            value={goodDeed}
                            onFocus={() => {handleFocus("good")}}
                            onBlur={handleBlur}
                            onChangeText={(value) => setGoodDeed(value)}/>
                </View>
            }

            {(focus=='' || focus=='learning') && 
                <View>
                    <Text style={styles.title}>Learning</Text>
                    <TextInput
                            style={styles.input}
                            placeholder={`I learned ..`}
                            placeholderTextColor={'white'}
                            value={learning}
                            onFocus={() => {handleFocus("learning")}}
                            onBlur={handleBlur}
                            onChangeText={(value) => setLearning(value)}/>
                </View>
            }
            {(focus=='' || focus=='highlight') && 
                <View>
                    <Text style={styles.title}>Highlights</Text>
                    {actionItems.map((item, index) => (
                        <TextInput
                            key={`action-${index}`}
                            style={styles.input}
                            placeholder={`I want to ..`}
                            placeholderTextColor={'white'}
                            value={item}
                            onFocus={() => {handleFocus("hightlight")}}
                            onBlur={handleBlurHightlight}
                            onChangeText={(value) => handleInputChangeHightlight(index, value)}/>
                    ))}

                
                    {hightlightItems.at(hightlightItems.length-1) != "" && <Button title="add" onPress={newHightlight}/>}
                </View>
            }
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