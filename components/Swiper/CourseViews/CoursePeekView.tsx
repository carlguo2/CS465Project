import { ScrollView, Text, View } from "react-native";
import React from "react";
import { CourseType } from "./CourseType";
import { Dimensions, StyleSheet } from "react-native";

interface CoursePeekViewProps {
    courses: Array<CourseType>
}

export const CoursePeekView: React.FC<CoursePeekViewProps> = ({
    courses
}) => {
    return (
        <ScrollView 
            horizontal={true} 
            persistentScrollbar={true}
            contentContainerStyle={styles.coursesRegion}
        >
            {courses.map((course, index) => {
                return(
                    <View style={styles.courseBox} key={index}>
                        <Text style={styles.courseText}>{course.Subject}</Text>
                        <Text style={styles.courseText}>{course.Number}</Text>
                    </View>
                );
            })}
        </ScrollView>
    ); 
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    coursesRegion: {
        flexDirection: 'row',
        alignItems: 'center',
        flexGrow: 1,
        padding: 10,
        height: 150,
        marginTop: 20
    },
    courseBox: {
        height: width / 5,
        width: width / 5,
        marginRight: 30,
        borderRadius: 15,
        backgroundColor: '#87ceeb',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0
    },
    courseText: {
        color: '#708090',
        fontWeight: 'bold'
    }
})