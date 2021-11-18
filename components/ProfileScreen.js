import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const ProfileScreen = ({ navigation, route }) => {
    const [subject, onSubjectText] = React.useState("");
    const [number, onNumberText] = React.useState("");

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Search for Courses</Text>
        <TextInput
            style={styles.input}
            onChangeText={(e) => {
            onSubjectText(e)
            }}
            placeholder="&#x1F50E; Subject"
            value={subject}
        />

        <TextInput
            style={styles.input}
            onChangeText={(e) => {
            onNumberText(e)
            }}
            placeholder="&#x1F50E; Number"
            value={number}
        />
        
        <View style={[{
        paddingTop: 30
        }]}>
            <Pressable style={styles.button} 
            onPress={() => {
                navigation.navigate(
                    'CourseDetail', 
                    {
                        subject: subject, 
                        number: number
                    }
                )
            }}>
                <Text style={styles.text} >Search</Text>
            </Pressable>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'white',
        margin: 5,
    },
    title: {
        fontSize: 30,
        color: "#fff",
        marginBottom: 40
    },
    input: {
        height: 40,
        width: 120,
        margin: 12,
        borderRadius: 5,
        backgroundColor: "#fff",
        borderWidth: 1,
        padding: 10,
        marginTop: 30
    },
    container: {
        flex: 1,
        backgroundColor: '#E84A2799',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default ProfileScreen