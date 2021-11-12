import React from "react";
import { StyleSheet, Image, Text, View, TextInput, Pressable, ScrollView } from 'react-native';
import courseData from "../backend/courses.json";

const DiscussionDetail = ({navigation, route}) => {
    
    let courseL = route.params.course;
    
    function retrieveLabData() {
        //console.log("called")
        var courses = [];
        for (var i = 0; i < courseData.length; i++) {
            if (courseL.Subject === courseData[i].Subject && (courseL.Number === "" || parseInt(courseL.Number) === courseData[i].Number) && (courseData[i].Type.includes("Discussion") || courseData[i].Type.includes("Lab"))) {
                courses.push(courseData[i]);
            }
        }
        //console.log(courses)
        
        return courses.map((course) => {                
                    return (
                        <Pressable style={styles.entry}
                        onPress={() => {
                            navigation.navigate('LabOnHold', {lab: course, lec: courseL})
                        }}>
                        <Text>{course.Type}</Text>
                        <Text>
                            {course["Days of Week"]}  |  {course["Start Time"]}  -  {course["End Time"]}
                        </Text>
                        </Pressable>
                    )
        })
    }

    return (
        <ScrollView style={styles.scroll}>
            { retrieveLabData() }
        </ScrollView>
    )
    
}

export default DiscussionDetail

const styles = StyleSheet.create({
    scroll:{
        backgroundColor: "#fc840320",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
      },
    entry: {
        borderRadius: 25,
        marginTop: 25,
        justifyContent: "center",
        width: "90%",
        marginLeft: "5%",
        backgroundColor: "#fff",
        height: 90,
        alignItems: "center"
    }
})