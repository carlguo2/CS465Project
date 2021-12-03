import React from "react";
import { StyleSheet, Image, Text, View } from 'react-native';
// @ts-ignore
import BlueTick from "../../assets/blueTick.png";
import { CourseType } from '../Swiper/CourseViews/CourseType'

interface LectureHoldSuccessProp {
    navigation: any,
    courseToAdd: CourseType,
    courseList: Array<CourseType>
}

export const LectureHoldSuccess: React.FC<LectureHoldSuccessProp> = ({
    courseToAdd,
    courseList,
    navigation
}) => {
    setTimeout(() => {
        navigation.navigate('DiscussionDetail', 
            {lectureCourse: courseToAdd, courseList: courseList})
    }, 1500);

    return(
        <View style={styles.container}>
            <View  style={styles.title}>
                <Text style={styles.titleText}>
                    Lecture On Hold!
                </Text>
            </View>
            <Image style={styles.img} source={BlueTick}/>
            <View style={styles.detailView}>
                <Text  style={styles.detail}>
                    {courseToAdd.Subject + "  " + courseToAdd.Number}
                </Text>
                <Text  style={styles.detail}>
                    {courseToAdd.Name}
                </Text>
                <Text  style={styles.detail}>
                    {courseToAdd["Days of Week"] + " | " + courseToAdd["Start Time"] + " - " + courseToAdd["End Time"]}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    titleText: {
        marginTop: "15%",
        fontSize: 30
    },
    detailView: {
        flexDirection: 'column',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 30,
        marginTop: 30,
        backgroundColor: "#D1D1D6"
    },
    title: {
        marginBottom: "15%"
    },
    container: {
        flexDirection: 'column',
        alignItems: "center",
        backgroundColor: "#fff",
        height: "100%"
    },
    img: {
        width: 100,
        height: 100,
        alignContent: "center",
        marginBottom: "15%"
    },
    detail: {
        textAlign: "center",
        padding: "3%"
    }
})