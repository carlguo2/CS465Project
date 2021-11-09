import React from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';

const CourseDetail = (course) => {

    let subject = course.route.params.subject
    let number = course.route.params.number

    return (
    <Text>
        {subject} {number}
    </Text>
    )
}

export default CourseDetail