import { Pressable, ScrollView, Text, View } from "react-native";
import React from "react";
import { CourseType } from "./CourseType";
import { Dimensions, StyleSheet, Alert } from "react-native";
import { child, get, getDatabase, ref, update } from "@firebase/database";

interface CoursePeekViewProps {
    courses: Array<CourseType>,
    removeCourseFromSchedule: (CourseType) => void
}

export const CoursePeekView: React.FC<CoursePeekViewProps> = ({
    courses,
    removeCourseFromSchedule
}) => {
    return (
        <View style={styles.peekContainer}>
            <Text style={styles.headerText} >Courses View</Text>
            <ScrollView 
                horizontal={true} 
                contentContainerStyle={styles.coursesRegion}
            >
                {courses && 
                courses.map((course, index) => {
                    return(
                        <Pressable 
                            key={index}
                            onLongPress={
                                () => {
                                    Alert.alert(
                                        "Delete Warning",
                                        "Are you sure you want to delete this course? Linked courses will also be deleted.",
                                        [
                                            {
                                                text: "Back"
                                            }, 
                                            {
                                                text: "Delete",
                                                onPress: () => {
                                                    const dbRef = ref(getDatabase());
                                                    get(child(dbRef, 'carlguo2/')).then((snapshot) => {
                                                        if (snapshot.exists()) {
                                                            let snapshotVal = snapshot.val();
                                                            for (var key in snapshotVal) {
                                                                if (snapshotVal[key]['title'].includes(course.CRN.toString())) {
                                                                    const updates = {}
                                                                    updates['carlguo2/' + key] = null
                                                                    update(dbRef, updates);
                                                                }
                                                            }
                                                        } else {
                                                            console.log("no data to delete");
                                                        }
                                                    }).catch((error) => {
                                                        console.error("error", error);
                                                    });
                                                    // removeCourseFromSchedule(course)
                                                }
                                            }
                                        ]
                                    );
                                }
                            }
                        >
                            <View style={styles.courseBox} key={index}>
                                <Text style={styles.courseText}>{course.Subject}</Text>
                                <Text style={styles.courseText}>{course.Number}</Text>
                                <Text style={styles.courseText}>{course["Type Code"]}</Text>
                            </View>
                        </Pressable>
                    );
                })}
            </ScrollView>
        </View>
    ); 
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    peekContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    headerText: {
        fontWeight: 'bold',
        marginTop: 10,
        fontSize: 25,
        color: '#808080',
    },
    coursesRegion: {
        flexDirection: 'row',
        alignItems: 'center',
        flexGrow: 1,
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        height: "100%"
    },
    courseBox: {
        height: width / 5,
        width: width / 5,
        marginRight: 30,
        borderRadius: 15,
        backgroundColor: '#64D2FF',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0
    },
    courseText: {
        color: '#1C1C1E',
        fontWeight: 'bold'
    }
})