import React from "react";
import { StyleSheet, Image, Text, View, TextInput, Pressable } from 'react-native';
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
    // const { course, navigation } = props;
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
            <View style = {styles.btm}>
                <Pressable
                    style={[styles.button, styles.buttonAdd]}
                    onPress={() => navigation.navigate('DiscussionDetail', 
                        {lectureCourse: courseToAdd, courseList: courseList}
                    )}
                >
                    <Text style={styles.textStyle}>Next</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    titleText: {
        marginTop: "15%",
        fontSize: 30
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
    button: {
        marginTop: 50,
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonAdd: {
          backgroundColor: "#2196F3",
      },
    btm: {
        flex: 6
    },
    detailView: {
        flex: 3,
        flexDirection: 'column',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 30,
        marginTop: 30,
        backgroundColor: "#D1D1D6"
    },
    title: {
        flex: 4
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
        alignContent: "center"
    },
    detail: {
        flex: 1,
        textAlign: "center"
    }
})