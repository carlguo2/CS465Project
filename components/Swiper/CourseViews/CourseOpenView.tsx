import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Dimensions, GestureResponderEvent } from "react-native";
import { CourseType } from "./CourseType";


interface CourseOpenViewProps {
    courses: Array<CourseType>
}

enum Days {
    M = "M",
    T = "T",
    W = "W",
    R = "R",
    F = "F"
}

export const CourseOpenView: React.FC<CourseOpenViewProps> = ({
    courses
}) => {
    const [dayOfWeek, setDayOfWeek] = useState<Days>(Days.M);

    function toggleDaysOfWeek(): JSX.Element {
        return(
            <View style={styles.buttonView}>
                <Pressable 
                    style={[styles.button, dayOfWeek === Days.M ? styles.pressed : {}]} 
                    onPress={() => {setDayOfWeek(Days.M)}}
                >
                    <Text style={styles.text}>M</Text>
                </Pressable>
                <Pressable 
                    style={[styles.button, dayOfWeek === Days.T ? styles.pressed : {}]}  
                    onPress={() => {setDayOfWeek(Days.T)}}
                >
                    <Text style={styles.text}>T</Text>
                </Pressable>
                <Pressable 
                    style={[styles.button, dayOfWeek === Days.W ? styles.pressed : {}]} 
                    onPress={() => {setDayOfWeek(Days.W)}}
                >
                    <Text style={styles.text}>W</Text>
                </Pressable>
                <Pressable 
                    style={[styles.button, dayOfWeek === Days.R ? styles.pressed : {}]} 
                    onPress={() => {setDayOfWeek(Days.R)}}
                >
                    <Text style={styles.text}>R</Text>
                </Pressable>
                <Pressable 
                    style={[styles.button, dayOfWeek === Days.F ? styles.pressed : {}]}  
                    onPress={() => {setDayOfWeek(Days.F)}}
                >
                    <Text style={styles.text}>F</Text>
                </Pressable>
            </View>
        )
    }

    return(
        <View>
            {toggleDaysOfWeek()}
            {courses.filter((course) => {
                return course["Days of Week"].includes(dayOfWeek.valueOf())
            }).map((course, index) => {
                return <Text key={index}>{course.Subject + " " + course.Number}</Text>
            })}
        </View>
    );
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    buttonView: {
        marginTop: height / 25,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: "100%",
    },
    button: {
        borderRadius: 100,
        backgroundColor: "#dcdcdc",
        width: width/10,
        height: width/10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pressed: {
        backgroundColor: '#778899'
    },
    text: {
        fontWeight: 'bold',
        color: '#f8f8ff'
    }
})