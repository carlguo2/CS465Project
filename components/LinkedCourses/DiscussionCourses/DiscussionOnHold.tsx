import React from "react";
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { hasNoCourseConflict } from "../../CourseModal";
import { CourseType } from "../../Swiper/CourseViews/CourseType";
// @ts-ignore
import blockI from "../../../assets/blockI.jpg";

interface DiscussionOnHoldProps {
    navigation: any,
    route: any
}

interface DiscussionOnHoldRouteProps {
    lec: CourseType,
    disc: CourseType,
    labCourses: Array<CourseType>,
    courseList: Array<CourseType>
}

export const DiscussionOnHold: React.FC<DiscussionOnHoldProps> = ({
    navigation,
    route
}) => {
    let { lec, disc, labCourses, courseList } : DiscussionOnHoldRouteProps = route.params;

    // end early if we no lab courses
    if (labCourses.length === 0) {
        setTimeout(() => {
            navigation.navigate('LabOnHold',  {
                lec: lec, 
                disc: disc,
                lab: {}
            }, 1000)
        })
    }

    function retrieveLabData() {
        let coursesToCheckConflict = [...courseList, lec, disc];

        return labCourses.map((labCourse, index) => {
            let hasTimeConflict = false;
            for (let heldCourse of coursesToCheckConflict) {
                if (!hasNoCourseConflict(heldCourse, labCourse)) {
                    hasTimeConflict = true;
                    break;
                }
            }
            return(
                <Pressable
                    style={[styles.entry, hasTimeConflict ? styles.disabled : {}]}
                    key={index}
                    disabled={hasTimeConflict}
                    onPress={() => {
                        navigation.navigate('LabOnHold', {
                            lec: lec,
                            disc: disc,
                            lab: labCourse
                        })
                    }}>
                        <Text>{labCourse.Type + (hasTimeConflict ? " - Time Conflict :(" : "")}</Text>
                        <Text>
                            {labCourse["Days of Week"]}  |  {labCourse["Start Time"]}  -  {labCourse["End Time"]}
                        </Text>
                </Pressable>
            )
        })
    }    

    return(
        <ImageBackground source={blockI} resizeMode="cover" style={styles.image} >
            <ScrollView>
                    { 
                        labCourses.length > 0 
                        ? 
                        retrieveLabData()
                        :
                        <Text>No Lab Sections to Add!</Text> 
                    }
            </ScrollView>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "center"
    },
    scroll:{
        backgroundColor: "#fff",
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
        backgroundColor: "#f4a460",
        height: 90,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        elevation: 2,
        borderColor: "#0455A4",
        borderWidth: 2,
        marginLeft: "5%",
    },
    disabled: {
        backgroundColor: '#a9a9a9'
    }
})