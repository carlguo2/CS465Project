import React from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';

const CourseDetail = (course) => {

    alert(course.route.params.subject + course.route.params.subject.number)

    return (
    <Text>
        Hi
    </Text>
    )
}

export default CourseDetail