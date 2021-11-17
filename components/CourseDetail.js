import React, { useState } from "react";
import { StyleSheet, Text, Modal, View, TextInput, Pressable, ScrollView } from 'react-native';
import { fonts } from "react-native-elements/dist/config";
import courseData from "../backend/courses.json";
import CourseModal from "./CourseModal";
import BottomDrawer from "./Swiper/BottomDrawer";

const CourseDetail = ({navigation, route}) => {

    let {subject, number} = route.params;
    
    function retrieveCourseData() {

        var courses = [];
        for (var i = 0; i < courseData.length; i++) {
            if (subject === courseData[i].Subject && (number === "" || parseInt(number) === courseData[i].Number) && !(courseData[i].Type.includes("Discussion") || courseData[i].Type.includes("Lab"))) {
                courses.push(courseData[i]);
            }
        }
      
        return courses.map((course) => {
            const [modalVisible, setModalVisible] = useState(false);
            return (
                <CourseModal 
                    course={course} 
                    modalVisible={modalVisible} 
                    setModalVisible={setModalVisible} 
                />
            )
        })
    }

    return (
        <>
            <ScrollView style={styles.scroll}>
                { retrieveCourseData() }
            </ScrollView>
            <BottomDrawer />
        </>
    )
}

export default CourseDetail

const styles = StyleSheet.create({
    scroll:{
        backgroundColor: "#fc840360"
    }
});