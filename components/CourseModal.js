import { StyleSheet, Text, Modal, View, Pressable } from 'react-native';
import React from 'react';
import { parseCourseTimes } from './Swiper/CourseViews/CourseOpenView';

function CourseModal(props) {
    const { course, modalVisible, setModalVisible, navigation, userData } = props;
    let noTimeConflict = true;
    let timeConflictCourse = {}

    function hasNoCourseConflict(
        registeredCourse,
        toRegisterCourse
    ) {
        let regCourseStartTime = parseCourseTimes(registeredCourse["Start Time"]);
        let regCourseEndTime = parseCourseTimes(registeredCourse["End Time"]);
        let toRegCourseStartTime = parseCourseTimes(toRegisterCourse["Start Time"]);
        let toRegCourseEndTime = parseCourseTimes(toRegisterCourse["End Time"]);
        // register course starts after to register
        if (regCourseStartTime > toRegCourseEndTime) {
            return true;
        }
        // to register course starts after register
        if (toRegCourseStartTime > regCourseEndTime) {
            return true;
        }
        let concatLength = (new Set(registeredCourse["Days of Week"] + toRegisterCourse["Days of Week"])).size 
        let separateLength = registeredCourse["Days of Week"].length + toRegisterCourse["Days of Week"].length;
        return concatLength === separateLength;
    }

    for (var i = 0; i < userData.courses.length; i++) {
        if (!hasNoCourseConflict(course, userData.courses[i])) {
            noTimeConflict = false;
            timeConflictCourse = userData.courses[i];//userData.courses[i].Subject + " " + userData.courses[i].Number;
            break;
        }
    }
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTextTitle}>{course.Subject + "   " + course.Number + "   "}</Text>
                    <Text style={styles.modalTextName}>{course.Name}</Text>
                    <Text style={styles.modalText}>{"Hours: " + course["Credit Hours"][0]}</Text>
                    <Text style={styles.modalText}>{"Section: " + course.Section}</Text>
                    <Text style={styles.modalText}>{"Type: " + course["Type Code"]}</Text>
                    <Text style={styles.modalText}>{"Instructor: " + course.Instructors}</Text>
                    <Text style={styles.modalText}>{"Location: " + course.Building + " " + course.Room}</Text>
                    <Text style={styles.modalTextPrereq}>{course["Section Info"]}</Text>
                    <Text style={styles.modalTextName}>Times</Text>
                    {
                      !noTimeConflict 
                      ? 
                      <Text style={[{color: 'red'}]}>
                        {
                          "A time conflict exists with " + timeConflictCourse.Subject + " " + timeConflictCourse.Number + "!"
                        }
                      </Text>
                      :
                      <></>
                    }
                    <View style={[{flexDirection: "row"}]}>
                      <Pressable
                        style={[styles.button, styles.buttonAdd]}
                            onPress={() => {
                                setModalVisible(!modalVisible)
                                navigation.navigate('LectureOnHold', {
                                  courseToAdd: course, 
                                  noTimeConflict: noTimeConflict,
                                  timeConflictCourse: timeConflictCourse
                                })
                            }}
                      >
                        <Text style={styles.textStyle}>Add</Text>
                      </Pressable>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            setModalVisible(!modalVisible)
                        }}
                      >
                        <Text style={styles.textStyle}>Cancel</Text>
                      </Pressable>
                    </View>
                </View>
                </View>
            </Modal>
            <Pressable key="{course.CRN}"  style = {styles.entry}
            onPress={() => {
                setModalVisible(true)
            }}>
            <Text style = {styles.text}>
                {course.Subject + "   " + course.Number}
            </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
      },
      modalView: {
        width: "80%",
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderColor: "#ff5e3b",
        borderWidth: 5,
      },
    text: {
        fontSize: 30,
    },
    entry: {
        borderRadius: 25,
        marginTop: 25,
        justifyContent: "center",
        width: "90%",
        backgroundColor: "#fff",
        height: 90,
        alignItems: "center"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonAdd: {
          backgroundColor: "#2196F3",
          marginRight: 40
      },
      buttonClose: {
        backgroundColor: "#c4c4c4",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 16
      },
      modalTextPrereq: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 16,
        backgroundColor: "#fcf9b8",
        padding: 5
      },
      modalTextTitle: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 24
      },
      modalTextName: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 19
      }
});

export default CourseModal;