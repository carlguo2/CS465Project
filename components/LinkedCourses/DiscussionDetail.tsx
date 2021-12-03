import React from "react";
import { StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import courseData from "../../backend/courses.json";
import { CourseType } from "../Swiper/CourseViews/CourseType";
import { hasNoCourseConflict } from '../CourseModal';

interface DiscussionDetailProps {
    navigation: any,
    route: any
}

interface DiscussionDetailRouteParams {
    lectureCourse: CourseType,
    courseList: Array<CourseType>
}

const DiscussionDetail: React.FC<DiscussionDetailProps> = ({
    navigation, 
    route
}) => {
    
    let { lectureCourse, courseList }: DiscussionDetailRouteParams = route.params;
    
    function retrieveLabData() {
        var linkedCourses: Array<CourseType> = [];
        for (var i = 0; i < courseData.length; i++) {
            if (lectureCourse.Subject === courseData[i].Subject 
                    && lectureCourse.Number === courseData[i].Number 
                    && (courseData[i].Type.includes("Discussion") || courseData[i].Type.includes("Lab"))) {
                linkedCourses.push(courseData[i]);
            }
        }

        // check time conflict
        let coursesToCheckConflict = [...courseList, lectureCourse];
        
        if (linkedCourses.length > 0) {
            return linkedCourses.map((linkedCourse, index) => {      
                let hasTimeConflict = false;
                for (let heldCourse of coursesToCheckConflict) {
                    if (!hasNoCourseConflict(heldCourse, linkedCourse)) {
                        hasTimeConflict = true;
                        break;
                    }
                }          
                return (
                    <Pressable 
                        style={[styles.entry, hasTimeConflict ? styles.disabled : {}]} 
                        key={index}
                        disabled={hasTimeConflict}
                        onPress={() => {
                            navigation.navigate('LabOnHold', {lec: lectureCourse, lab: linkedCourse})
                        }}
                    >
                        <Text>{linkedCourse.Type + (hasTimeConflict ? " - Time Conflict :(" : "")}</Text>
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
        backgroundColor: "#f4a460",
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
    },
    disabled: {
        backgroundColor: '#a9a9a9'
    }
})