import React from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView } from 'react-native';
import courseData from "../backend/courses_new.json";

const CourseDetail = (course) => {

    let {subject, number} = course.route.params;

    let classList = ['400', '401', '407'];
    
    function retrieveCourseData() {
        var courses = [];
        for (var i = 0; i < courseData.length; i++) {
            if (subject === courseData[i].Subject && (number === "" || parseInt(number) === courseData[i].Number)) {
                courses.push(courseData[i]);
            }
        }
        return courses.map((course) => {
            return (
                <View>
                    <Text>
                    {course.Subject + ":" + course.Number}
                    </Text>
                </View>
            )
        })
    }

    return (
    // <Text>
    //     {subject} {number}
    // </Text>
    <ScrollView>
        {/* <Text>
            Search result for
        </Text>
        <Text>
            {subject}
        </Text>
        <Text>
            {number}
        </Text> */}
        { retrieveCourseData() }
    </ScrollView>
    )
}

export default CourseDetail