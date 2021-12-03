import React from "react";
import { StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import courseData from "../../backend/courses.json";
import { CourseType } from "../Swiper/CourseViews/CourseType";

interface DiscussionDetailProps {
    navigation: any,
    route: any
}

const DiscussionDetail: React.FC<DiscussionDetailProps> = ({
    navigation, 
    route
}) => {
    
    let { lectureCourse }: {lectureCourse: CourseType} = route.params;
    
    function retrieveLabData() {
        var linkedCourses: Array<CourseType> = [];
        for (var i = 0; i < courseData.length; i++) {
            if (lectureCourse.Subject === courseData[i].Subject 
                    && lectureCourse.Number === courseData[i].Number 
                    && (courseData[i].Type.includes("Discussion") || courseData[i].Type.includes("Lab"))) {
                linkedCourses.push(courseData[i]);
            }
        }
        
        if (linkedCourses.length > 0) {
            return linkedCourses.map((linkedCourse, index) => {                
                return (
                    <Pressable style={styles.entry} key={index}
                    onPress={() => {
                        navigation.navigate('LabOnHold', {lec: lectureCourse, lab: linkedCourse})
                    }}>
                    <Text>{linkedCourse.Type}</Text>
                    <Text>
                        {linkedCourse["Days of Week"]}  |  {linkedCourse["Start Time"]}  -  {linkedCourse["End Time"]}
                    </Text>
                    </Pressable>
                )
            })
        } else {
            return (
                <Pressable style={styles.entry}
                    onPress={() => {
                        navigation.navigate('LabOnHold', {lec: lectureCourse, lab: {}})
                    }}>
                    <Text>
                       No lab/discussion for this class, you are all set!
                    </Text>
                 </Pressable>
            )
        }
    }

    return (
        <ScrollView style={styles.scroll}>
            { retrieveLabData() }
        </ScrollView>
    )
    
}

export default DiscussionDetail

const styles = StyleSheet.create({
    scroll:{
        backgroundColor: "#fff",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
      },
    entry: {
        borderRadius: 25,
        marginTop: 25,
        justifyContent: "center",
        width: "90%",
        backgroundColor: "#fff",
        height: 90,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        elevation: 2,
        borderColor: "#0455A4",
        borderWidth: 2,
        marginLeft: "5%",

    }
})