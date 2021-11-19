import React from "react";
import { StyleSheet, Image, Text, View, TextInput, Pressable } from 'react-native';
import { LectureHoldSuccess } from "./LectureHoldSuccess";
import { RemoveWarning } from "./RemoveWarning";

const LectureOnHold = ({navigation, route}) => {
    let { courseToAdd, noTimeConflict, timeConflictCourse } = route.params;

    return (   
            noTimeConflict 
                ? <LectureHoldSuccess course={courseToAdd} navigation={navigation} /> 
                : <RemoveWarning courseToAdd={courseToAdd} 
                    timeConflictCourse={timeConflictCourse}
                    navigation={navigation} /> 
    );
}

export default LectureOnHold