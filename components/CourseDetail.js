import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from 'react-native';
import courseData from "../backend/courses.json";
import userData from "../backend/users.json";
import CourseModal from "./CourseModal";
import BottomDrawer from "./Swiper/BottomDrawer";

const CourseDetail = ({navigation, route}) => {

    let {subject, number} = route.params;

    const [userCourses, setUserCourses] = useState([]);
    const [userName, setUserName] = useState("");

    function retrieveUserData(userName) {
        for (let i = 0; i < userData.length; i++) {
            if (userData[i].userName === userName) {
                setUserName(userData[i].userName);
                setUserCourses(userData[i].courses);
                return;
            }
        }
    }

    function retrieveCourseData() {
        var courses = [];
        for (var i = 0; i < courseData.length; i++) {
            if (subject.toUpperCase() === courseData[i].Subject 
                    && (number === "" || parseInt(number) === courseData[i].Number) 
                    && !(courseData[i].Type.includes("Discussion") || courseData[i].Type.includes("Lab"))) {
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
                    navigation={navigation}
                    key={course.CRN}
                />
            )
        })
    }

    useEffect(() => {
        retrieveUserData("Carl Guo");
    }, [userName])

    return (
        <>
            <ScrollView style={[styles.scroll]}>
                { retrieveCourseData() }
            </ScrollView>
            <BottomDrawer courses={userCourses} name={userName} />
        </>
    )
}

export default CourseDetail

const styles = StyleSheet.create({
    scroll:{
        backgroundColor: "#E84A2799"
    }
});