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
        <View style={styles.peekContainer}>
            <Text style={styles.headerText} >Courses View</Text>
            <ScrollView 
                horizontal={true} 
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
        </View>
    ); 
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    peekContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    headerText: {
        fontWeight: 'bold',
        marginTop: 10,
        fontSize: 25,
        color: '#808080',
    },
    coursesRegion: {
        flexDirection: 'row',
        alignItems: 'center',
        flexGrow: 1,
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        height: "100%"
    },
    courseBox: {
        height: width / 5,
        width: width / 5,
        marginRight: 30,
        borderRadius: 15,
        backgroundColor: '#64D2FF',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0
    },
    courseText: {
        color: '#1C1C1E',
        fontWeight: 'bold'
    }
})