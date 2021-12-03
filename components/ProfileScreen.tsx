import * as React from 'react';
import { Image, StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
//@ts-ignore
import topImg from "../assets/bg.jpg";

interface ProfileScreenProps {
    navigation: any,
    route: any
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ 
    navigation, 
    route 
}) => {
    const [subject, onSubjectText] = React.useState("");
    const [number, onNumberText] = React.useState("");

    return (
        <View style={styles.container}>

            <View style={styles.b0}>
            <Image style={styles.img} source={topImg} blurRadius={20}/>
            </View>
            <View style={styles.titlecard}>
            <View style={styles.b1}>
            
            <Text style={styles.title}>Search for Courses</Text>
            
            </View>

            <View style={styles.b2}>
            <TextInput
                style={styles.input}
                onChangeText={(e) => {
                onSubjectText(e)
                }}
                placeholder="&#x1F50E; Subject"
                value={subject}
            />
            </View>

            <View style={styles.b3}>
            <TextInput
                style={styles.input}
                onChangeText={(e) => {
                onNumberText(e)
                }}
                placeholder="&#x1F50E; Number"
                value={number}
            />
            </View>
            </View>
            
            <View style={styles.b4}>
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

            <View style={styles.b5}>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    titlecard: {
        flex: 3,
        borderRadius: 20,
        backgroundColor: "#fff",
        padding: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    img: {
        height: 1500
    },
    b0: {
        flex: 1,
        
    },
    b1: {
        justifyContent: 'center',
        flex: 2
    },
    b2: {
        flex: 3
    },
    b3: {
        flex: 3
    },
    b4: {
        flex: 2
    },
    b5: {
        flex: 0
    },
    text: {
        fontSize: 20,
        lineHeight: 32,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    button: {
        marginTop: 50,
        alignItems: 'center',
        color: "#000",
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 120,
        borderRadius: 40,
        elevation: 3,
        backgroundColor: '#E84A27',
        margin: 5,
    },
    title: {
        backgroundColor: "#fff",
        fontSize: 30,
        fontWeight: "600",
        color: "#13294b",
    },
    input: {
        height: 60,
        width: 200,
        margin: 12,
        borderRadius: 25,
        backgroundColor: "#fff",
        borderColor: "#c7c7c7",
        borderWidth: 1,
        padding: 10,
        marginTop: 30,
        fontSize: 30
    },
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default ProfileScreen