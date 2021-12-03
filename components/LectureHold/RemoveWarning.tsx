import React from "react";
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';
import { getDatabase, ref, update, get, child } from 'firebase/database';
import { CourseType } from "../Swiper/CourseViews/CourseType";

function removeInDb(conflictCourse: CourseType) {
    let CRN = conflictCourse.CRN;
    // Loop through all the items in database
    // Remove the one that contains CRN
    const dbRef = ref(getDatabase());
    get(child(dbRef, `carlguo2/`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log("Data from firebase")
            let ss = snapshot.val();
            for (var k in ss) {
                if (ss[k]['title'].includes(CRN)) {
                    const updates = {}
                    updates['carlguo2/' + k] = null
                    update(dbRef, updates);
                }
            }
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
}

interface RemoveWarningProps {
    courseToAdd: CourseType,
    conflictCourse: CourseType,
    navigation: any,
    courseList: Array<CourseType>
}

export const RemoveWarning: React.FC<RemoveWarningProps> = ({
    courseToAdd,
    conflictCourse,
    courseList,
    navigation
}) => {
    return (
        <View style={styles.viewContainer}>
            <View style={styles.centeredView}>
                <Text style={styles.text}>
                    You already have
                </Text>
                <View style={styles.courseContainer}>
                    <Text style={styles.containerText}>
                        {conflictCourse.Subject + conflictCourse.Number + ": " + conflictCourse.Section}
                    </Text>
                    <Text style={styles.containerText}>
                        {conflictCourse["Days of Week"] + " | " + conflictCourse["Start Time"] + " to " + conflictCourse["End Time"]}
                    </Text>
                </View>
                <Text style={styles.text}>
                    Do you want to remove it for
                </Text>
                <View style={styles.courseContainer}>
                    <Text style={styles.containerText}>
                        {courseToAdd.Subject + courseToAdd.Number + ": " 
                            + (courseToAdd.Section ? courseToAdd.Section : "UNKNOWN")}
                    </Text>
                    <Text style={styles.containerText}>
                        {courseToAdd["Days of Week"] + " | " + courseToAdd["Start Time"] + " to " + courseToAdd["End Time"]}
                    </Text>
                </View>
                <Text style={[styles.warningTextStyles, styles.text]}>
                    This may remove multiple sections!
                </Text>
                <View style={styles.buttonsContain}>
                    <Pressable 
                        onPress= {() => {
                            navigation.navigate(
                                "CourseDetail",
                                {
                                    subject: courseToAdd.Subject,
                                    number: courseToAdd.Number
                                });
                        }}
                        style={[styles.backButton, styles.button]}
                    >
                        <Text>Back</Text>
                    </Pressable>
                    <Pressable
                        onPress={()=>{
                            removeInDb(conflictCourse)
                            navigation.navigate("RemoveAllSuccess", 
                                {course: courseToAdd, courseList: courseList})
                        }}
                        style={[styles.removeButton, styles.button]}
                    >
                        <Text>Remove</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    viewContainer: {
        width: width,
        height: height,
        backgroundColor: "#FFFFFF",
        flexDirection: 'column',
        alignItems: 'center'
    },
    centeredView: {
        flexDirection: 'column',
        alignItems: 'center',
        width: width * 0.75
    },
    text: {
        fontWeight: '400',
        fontSize: 22,
        marginTop: height * 0.05,
        marginBottom: height * 0.05,
        textAlign: 'center'
    },
    courseContainer: {
        paddingTop: height * 0.04,
        paddingBottom: height * 0.04,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D1D1D6',
        width: 0.8 * width,
        borderRadius: 15
    },
    containerText: {
        fontSize: 18,
        color: '#000000',
        fontWeight: 'bold'
    },
    warningTextStyles: {
        color: '#ff0000'
    },
    buttonsContain: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: width * 0.03,
        paddingHorizontal: width * 0.05,
        borderRadius: 20,
        elevation: 3,
        marginLeft: width * 0.15,
        marginRight: width * 0.15
    },
    backButton: {
        backgroundColor: '#007AFF',
    },
    removeButton: {
        backgroundColor: '#FF453A',
    }
})