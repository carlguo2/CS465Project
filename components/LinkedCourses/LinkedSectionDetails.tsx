import React from "react";
import { StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import courseData from "../../backend/courses.json";
import { CourseType } from "../Swiper/CourseViews/CourseType";
import { hasNoCourseConflict } from '../CourseModal';

interface LinkedSectionDetailsProps {
    navigation: any,
    route: any
}

interface LinkedSectionDetailsRouteParams {
    lectureCourse: CourseType,
    courseList: Array<CourseType>
}

const LinkedSectionDetails: React.FC<LinkedSectionDetailsProps> = ({
    navigation, 
    route
}) => {
    
    let { lectureCourse, courseList }: LinkedSectionDetailsRouteParams = route.params;
    
    function retrieveLinkedData() {
        var discussionSections: Array<CourseType> = [];
        var labSections: Array<CourseType> = [];
        for (var i = 0; i < courseData.length; i++) {
            if (lectureCourse.Subject === courseData[i].Subject 
                && lectureCourse.Number === courseData[i].Number) {
                if (courseData[i].Type.includes("Discussion")) {
                    discussionSections.push(courseData[i]);
                } else if (courseData[i].Type.includes("Lab")) {
                    labSections.push(courseData[i]);
                }
            }
        }

        if (discussionSections.length > 0) {
            let coursesToCheckConflict = [...courseList, lectureCourse];
            return discussionSections.map((discussionCourse, index) => {      
                let hasTimeConflict = false;
                for (let heldCourse of coursesToCheckConflict) {
                    if (!hasNoCourseConflict(heldCourse, discussionCourse)) {
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
                            navigation.navigate('DiscussionOnHold', {
                                lec: lectureCourse, 
                                disc: discussionCourse,
                                labCourses: labSections,
                                courseList: courseList
                            })
                        }}
                    >
                        <Text>{discussionCourse.Type + (hasTimeConflict ? " - Time Conflict :(" : "")}</Text>
                        <Text>
                            {discussionCourse["Days of Week"]}  |  {discussionCourse["Start Time"]}  -  {discussionCourse["End Time"]}
                        </Text>
                    </Pressable>
                )
            });
        } else if (labSections.length > 0) {
            let coursesToCheckConflict = [...courseList, lectureCourse];
            return labSections.map((labCourse, index) => {      
                let hasTimeConflict = false;
                for (let heldCourse of coursesToCheckConflict) {
                    if (!hasNoCourseConflict(heldCourse, labCourse)) {
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
                            navigation.navigate('LabOnHold', {
                                lec: lectureCourse, 
                                disc: {},
                                lab: labCourse})
                        }}
                    >
                        <Text>{labCourse.Type + (hasTimeConflict ? " - Time Conflict :(" : "")}</Text>
                        <Text>
                            {labCourse["Days of Week"]}  |  {labCourse["Start Time"]}  -  {labCourse["End Time"]}
                        </Text>
                    </Pressable>
                )
            })
        } else {
            return (
                <Pressable style={styles.entry}
                    onPress={() => {
                        navigation.navigate('LabOnHold', {
                            lec: lectureCourse, 
                            disc: {}, 
                            lab: {}
                        })
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
            { retrieveLinkedData() }
        </ScrollView>
    )
    
}

export default LinkedSectionDetails;

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