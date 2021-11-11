import React, { useState } from "react";
import { StyleSheet, Text, Modal, View, TextInput, Pressable, ScrollView } from 'react-native';
import { fonts } from "react-native-elements/dist/config";
import courseData from "../backend/courses.json";
import CourseModal from "./CourseModal"

const CourseDetail = (course) => {

    let {subject, number} = course.route.params;
    
    function retrieveCourseData() {
        var courses = [];
        for (var i = 0; i < courseData.length; i++) {
            if (subject === courseData[i].Subject && (number === "" || parseInt(number) === courseData[i].Number)) {
                courses.push(courseData[i]);
            }
        }
        return courses.map((course) => {
            const [modalVisible, setModalVisible] = useState(false);
            return (
                <View style={styles.centeredView}>
                    <CourseModal 
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        course={course}
                    />
                    <Pressable key="{course.CRN}"  style = {styles.entry}
                    onPress={() => {
                        setModalVisible(true)
                    }}>
                        <Text style = {styles.text}>
                        {course.Subject + "   " + course.Number}
                        </Text>
                    </Pressable>
                </View>
            )
        })
    }

    return (
    <ScrollView style={styles.scroll}>
        { retrieveCourseData() }
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    text: {
        fontSize: 30,
    },
    scroll:{
        backgroundColor: "#fc840360"
    },
    entry: {
        borderRadius: 25,
        marginTop: 25,
        justifyContent: "center",
        width: "90%",
        backgroundColor: "#fff",
        height: 90,
        alignItems: "center"
    }
});

export default CourseDetail
