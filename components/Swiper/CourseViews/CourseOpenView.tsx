import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Dimensions, GestureResponderEvent, ScrollView } from "react-native";
import { CourseType } from "./CourseType";


interface CourseOpenViewProps {
    courses: Array<CourseType>
}

enum Days {
    M = "M",
    T = "T",
    W = "W",
    R = "R",
    F = "F"
}

export const CourseOpenView: React.FC<CourseOpenViewProps> = ({
    courses
}) => {
    const [dayOfWeek, setDayOfWeek] = useState<Days>(Days.M);

    function toggleDaysOfWeek(): JSX.Element {
        return(
            <View style={styles.buttonView}>
                <Pressable 
                    style={[styles.button, dayOfWeek === Days.M ? styles.pressed : {}]} 
                    onPress={() => {setDayOfWeek(Days.M)}}
                >
                    <Text style={styles.buttonText}>M</Text>
                </Pressable>
                <Pressable 
                    style={[styles.button, dayOfWeek === Days.T ? styles.pressed : {}]}  
                    onPress={() => {setDayOfWeek(Days.T)}}
                >
                    <Text style={styles.buttonText}>T</Text>
                </Pressable>
                <Pressable 
                    style={[styles.button, dayOfWeek === Days.W ? styles.pressed : {}]} 
                    onPress={() => {setDayOfWeek(Days.W)}}
                >
                    <Text style={styles.buttonText}>W</Text>
                </Pressable>
                <Pressable 
                    style={[styles.button, dayOfWeek === Days.R ? styles.pressed : {}]} 
                    onPress={() => {setDayOfWeek(Days.R)}}
                >
                    <Text style={styles.buttonText}>TH</Text>
                </Pressable>
                <Pressable 
                    style={[styles.button, dayOfWeek === Days.F ? styles.pressed : {}]}  
                    onPress={() => {setDayOfWeek(Days.F)}}
                >
                    <Text style={styles.buttonText}>F</Text>
                </Pressable>
            </View>
        )
    }

    function parseCourseTimes(timeString: string): {hour: number, minute: number} {
        let isAM = timeString.substr(-2,2) === "AM";
        var hourValue = parseInt(timeString.substr(0,2));
        let hour = isAM ? hourValue : hourValue + 12;
        let minute = parseInt(timeString.substr(3,2));
        return {
            hour: hour,
            minute: minute
        }
    }

    function courseLayout() : JSX.Element {
        return (
            <ScrollView style={styles.scheduleLayout}>
                {courses.filter((course) => {
                    return course["Days of Week"].includes(dayOfWeek.valueOf())
                }).sort((courseA: CourseType, courseB: CourseType): number => {
                    // parse out times
                    let courseATime = parseCourseTimes(courseA["Start Time"])
                    let courseBTime = parseCourseTimes(courseB["Start Time"]);
                    if (courseATime.hour < courseBTime.hour) {
                        return -1;
                    } else if (courseATime.hour === courseBTime.hour) {
                        if (courseATime.minute < courseBTime.minute) {
                            return -1;
                        } else if (courseATime.minute === courseBTime.minute) {  // this case should never happen
                            return 0;
                        } else {
                            return 1;
                        }
                    } else {
                        return 1;
                    }
                }).map((course, index) => {
                    return (
                        <View style={styles.courseContainer} key={index}>
                            <View style={styles.courseTitleArea}>
                                <View style={styles.courseTitleBox}>
                                    <Text key={index + "subject"} style={styles.courseTitleText}>
                                        {course.Subject}
                                    </Text>
                                    <Text key={index + "number"} style={styles.courseTitleText}>
                                        {course.Number}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.courseInfo}>
                                <View style={styles.courseInfoBox}>
                                    <Text key={index + "info"} style={styles.courseInfoText}>
                                        {course["Start Time"] + "-" + course["End Time"]}
                                    </Text>
                                    <Text key={index + "building"} style={styles.courseInfoText}>
                                        {course.Building.length > 0 
                                            ? (course.Building + " " + course.Room)
                                            : "No Building"}
                                    </Text>
                                    <Text key={index + "instruct"} style={styles.courseInfoText}>
                                        {course.Instructors}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>

        );
    }

    return(
        <View style={styles.calendarView}>
            <Text style={styles.headerText} >Calendar View</Text>
            {toggleDaysOfWeek()}
            {courseLayout()}
        </View>
    );
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    headerText: {
        fontWeight: 'bold',
        marginTop: 10,
        fontSize: 25,
        color: '#778899'
    },
    calendarView: {
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    buttonView: {
        marginTop: height / 50,
        marginBottom: height/20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: "90%",
        height: height/10,
        borderBottomColor: '#d3d3d3',
        borderBottomWidth: 4
    },
    button: {
        borderRadius: 100,
        backgroundColor: "#dcdcdc",
        width: width/8,
        height: width/8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pressed: {
        backgroundColor: '#778899'
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#f8f8ff'
    },
    scheduleLayout: {
        flexDirection: 'column',
        flexGrow: 1,
        width: "100%"
    },
    courseContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: width / 20
    },
    courseTitleArea: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    courseTitleBox: {
        height: width / 6,
        width: width / 6,
        borderRadius: 15,
        backgroundColor: '#64D2FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    courseTitleText: {
        color: '#f5f5f5',
        fontWeight: 'bold'
    },
    courseInfo: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 3,
    },
    courseInfoBox: {
        backgroundColor: '#00000021',
        borderRadius: 15,
        width: "95%",
        height: width / 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    courseInfoText: {
        fontWeight: 'bold',
        color: '#1C1C1E'
    }
})