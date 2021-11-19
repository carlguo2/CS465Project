import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from 'react-native';
import courseData from "../backend/courses.json";
// import userData from "../backend/users.json";
import CourseModal from "./CourseModal";
import BottomDrawer from "./Swiper/BottomDrawer";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, update,  } from 'firebase/database';
import { jsonEval } from "@firebase/util";

const firebaseConfig = {
    apiKey: "AIzaSyCSycESSMI-0P9COzhOWDqfbddLhf5YCgI",
    authDomain: "cs465project-cb825.firebaseapp.com",
    databaseURL: "https://cs465project-cb825-default-rtdb.firebaseio.com",
    projectId: "cs465project-cb825",
    storageBucket: "cs465project-cb825.appspot.com",
    messagingSenderId: "168437662044",
    appId: "1:168437662044:web:911afa9fdb8d340458c199",
    measurementId: "G-Q8YYNN8JX0"
};

initializeApp(firebaseConfig);

let CRNS = []

let userData = [{
                    "userName": "Carl Guo",
                    "courses": []
                }]

function setupHighscoreListener() {const db = getDatabase();
    const reference = ref(db, 'user1/');

    onValue(reference, (snapshot) => {
      const v = snapshot.val();
      let l = Object.keys(v)
      for (var i = 0; i < l.length; i++) {
          let c = v[l[i]]['title'].split(' ')
          for (var j = 0; j < c.length; j ++) {
            CRNS.push(c[j])
          }
      }
      CRNS = [...new Set(CRNS)]
    });
  }

function updateCourses() {
    //alert(JSON.stringify(userData2))
    for (var i = 0; i < CRNS.length; i ++) {
        for (var i = 0; i < courseData.length; i++) {
            if (courseData[i].CRN = CRNS[i]) {
                let toAdd = {
                    "Subject": courseData[i].Subject,
                    "Number": courseData[i].Number,
                    "Name": courseData[i].Name,
                    "Start Time": courseData[i]["Start Time"],
                    "End Time": courseData[i]["End Time"],
                    "Days of Week": courseData[i]["Days of Week"],
                    "Room": courseData[i].Room,
                    "Building": courseData[i].Building,
                    "Instructors": courseData[i].Instructors
                }
                userData[0].courses.push(toAdd)
            }
        }
    }
    
}


const CourseDetail = ({navigation, route}) => {

    let {subject, number} = route.params;
    setupHighscoreListener()
    updateCourses()

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