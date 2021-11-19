import React from "react";
import { StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import courseData from "../../backend/courses.json";

const DiscussionDetail = ({navigation, route}) => {
    
    let courseL = route.params.course;
    console.log(courseL)
    
    function retrieveLabData() {
        var courses = [];
        for (var i = 0; i < courseData.length; i++) {
            if (courseL.Subject === courseData[i].Subject 
                    && (courseL.Number === "" || parseInt(courseL.Number) === courseData[i].Number) 
                    && (courseData[i].Type.includes("Discussion") || courseData[i].Type.includes("Lab"))) {
                courses.push(courseData[i]);
            }
        }
        
        if (courses.length > 0) {
            return courses.map((course) => {                
                return (
                    <Pressable style={styles.entry}
                    onPress={() => {
                        navigation.navigate('LabOnHold', {lec: courseL, lab: course})
                    }}>
                    <Text>{course.Type}</Text>
                    <Text>
                        {course["Days of Week"]}  |  {course["Start Time"]}  -  {course["End Time"]}
                    </Text>
                    </Pressable>
                )
            })
        } else {
            return (
                <Pressable style={styles.entry}
                    onPress={() => {
                        navigation.navigate('LabOnHold', {lec: courseL, lab: {}})
                    }}>
                    <Text>
                       No lab/discussion for this class, you are all set!
                    </Text>
                 </Pressable>
            )
        }
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
        backgroundColor: "#E84A2766",
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