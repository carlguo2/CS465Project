import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, ImageBackground, View, Dimensions } from 'react-native';
import courseData from "../backend/courses.json";
import { CourseModal } from "./CourseModal";
import BottomDrawer from "./Swiper/BottomDrawer";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, onChildRemoved  } from 'firebase/database';
import { CourseType } from "./Swiper/CourseViews/CourseType";
// @ts-ignore
import blockI from "../assets/blockI.jpg";

// CONFIG FIREBASE REALTIME DB
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

interface CourseDetailProps {
    navigation: any,
    route: any
}

interface CourseDetailRouteParamProps {
    subject: string,
    number: string
}

const CourseDetail: React.FC<CourseDetailProps> = ({
    navigation, 
    route
}) => {

    let {subject, number}: CourseDetailRouteParamProps = route.params;

    const [userCourses, setUserCourses] = useState([]);
    const [CRNs, setCRNs] = useState([]);

    function retrieveUserData() {
        retrieveCoursesFromDB()
        updateCourses()
    }

    function removeCourseFromSchedule(courseToRemove: CourseType): void {
        setUserCourses(sort(userCourses.filter(course => 
                                course.Subject !== courseToRemove.Subject 
                                && course.Number !== courseToRemove.Number)));
    }

    function retrieveCoursesFromDB():void {
        const db = getDatabase();
        const reference = ref(db, 'carlguo2/');

        onValue(reference, (snapshot) => {
            let newCRNs = []
            const v = snapshot.val();
            if (!v) {
                return
            }
            let l = Object.keys(v)
            for (var i = 0; i < l.length; i++) {
                let c = v[l[i]]['title'].split(' ')
                for (var j = 0; j < c.length; j ++) {
                    newCRNs.push(c[j])
                }
            }
            newCRNs = [...new Set(newCRNs)]
            setCRNs(newCRNs);
        });

        onChildRemoved(reference, (snapshot) => {
            let tempCRNs = CRNs
            const v = snapshot.val();
            if (!v) {
                return
            }
            let c = v['title'].split(' ')
            for (var j = 0; j < c.length; j ++) {
                tempCRNs.filter(crn => crn !== c[j]);
            }
            setCRNs(tempCRNs)
        })
    }

    // TODO: edit so that it is only one run through
    function updateCourses() {
        const courses = []
        for (var i = 0; i < CRNs.length; i ++) {
            for (var j = 0; j < courseData.length; j++) {
                if (courseData[j].CRN === parseInt(CRNs[i])) {
                    courses.push(courseData[j])
                    break;
                }
            }
        }
        setUserCourses(sort(courses));
    }

    function isBefore(a: String, b: String) {
        var time1 = a[6] == 'A' 
            ? parseInt(a.substring(0,2)) * 60 + parseInt(a.substring(3, 5)) 
            : (12 + parseInt(a.substring(0,2))) * 60 + parseInt(a.substring(3, 5))
        var time2 = b[6] == 'A' 
            ? parseInt(b.substring(0,2)) * 60 + parseInt(b.substring(3, 5)) 
            : (12 + parseInt(b.substring(0,2))) * 60 + parseInt(b.substring(3, 5))
        var t = time1 < time2
        return t
    }

    function sort(c: Array<CourseType>): Array<CourseType> {
        for (var j = 0; j < c.length; j ++) {
            for (var k = j + 1; k < c.length; k ++) {
                if (isBefore(c[k]["Start Time"], c[j]["Start Time"])) {
                    var temp = c[k];
                    c[k] = c[j]
                    c[j] = temp
                }
            }
        }
        return c;
    }

    function retrieveCourseData(): Array<JSX.Element> {
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
                    courseList={userCourses}
                    key={course.CRN}
                />
            )
        })
    }

    useEffect(() => {
        retrieveUserData()
    }, [])

    useEffect(() => {
        updateCourses();
    }, [CRNs]);

    return (
        <View style={styles.container}>
                <ImageBackground source={blockI} resizeMode="cover" style={styles.image} />
                <ScrollView style={[styles.scroll]}>

                    { retrieveCourseData() }

                </ScrollView>
                <BottomDrawer 
                    courses={userCourses} 
                    removeCourseFromSchedule={removeCourseFromSchedule}
                />
        </View>
    )
}

export default CourseDetail

const styles = StyleSheet.create({
    container: {
        // width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height,
        // backgroundColor: 'transparent'
    },
    image: {
        position: 'absolute', 
        top:0, 
        left:0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    scroll:{
        backgroundColor: "transparent",
    }
});