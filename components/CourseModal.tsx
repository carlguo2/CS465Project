import { StyleSheet, Text, Modal, View, Pressable, Alert } from 'react-native';
import React from 'react';
import { parseCourseTimes } from './Swiper/CourseViews/CourseOpenView';
import { CourseType } from './Swiper/CourseViews/CourseType';

export function hasNoCourseConflict(
	registeredCourse: CourseType,
	toRegisterCourse: CourseType
): boolean {
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
	let concatLength = (new Set(registeredCourse["Days of Week"] + toRegisterCourse["Days of Week"])).size; 
	let separateLength = registeredCourse["Days of Week"].length + toRegisterCourse["Days of Week"].length;
	return concatLength === separateLength;
}

interface CourseModalProps {
	course: CourseType,
	modalVisible: boolean,
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
	navigation: any,
	courseList: Array<CourseType>
}

export const CourseModal: React.FC<CourseModalProps> = ({
	course,
	modalVisible,
	setModalVisible,
	navigation,
	courseList
}) => {
    let noTimeConflict = true;
    let conflictCourse = {} as CourseType;
	let choseDuplicateCourse = false;

	// check for time conflict
    for (var i = 0; i < courseList.length; i++) {
        if (courseList[i].Type.includes('Lecture') && !hasNoCourseConflict(course, courseList[i])) {
            noTimeConflict = false;
            conflictCourse = courseList[i];
            break;
        }
    }

	// check for duplicate course chosen
	for (var i = 0; i < courseList.length; i++) {
		if (courseList[i].Type.includes('Lecture') && courseList[i].Subject === course.Subject 
				&& courseList[i].Number === course.Number) {
			choseDuplicateCourse = true;
			conflictCourse = courseList[i];
			break;
		}
	}

    return (
        <View style={styles.centeredView1}>
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
                    {
                      !noTimeConflict 
                      ? 
                      <Text style={[{color: 'red', fontWeight: 'bold'}]}>
                        {
                          "A time conflict exists with " + conflictCourse.Subject + " " + conflictCourse.Number + "!"
                        }
                      </Text>
                      :
                      <></>
                    }
					{
						choseDuplicateCourse
						?
						<Text style={[{color: 'red', fontWeight: "bold"}]}>
							{"No chosing the same course twice!"}
						</Text>
						:
						<></>
					}
                    <View style={[{flexDirection: "row", paddingTop: 20}]}>
                      <Pressable
                        	style={[styles.button, styles.buttonAdd]}
                            onPress={() => {
                                setModalVisible(!modalVisible)
                                navigation.navigate('LectureOnHold', {
                                  courseToAdd: course, 
                                  noTimeConflict: noTimeConflict,
								  choseDuplicateCourse: choseDuplicateCourse,
                                  conflictCourse: conflictCourse,
                                  courseList: courseList
                                })
                            }}
                      >
                        <Text style={styles.buttonTextStyle}>Add</Text>
                      </Pressable>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            setModalVisible(!modalVisible)
                        }}
                      >
                        <Text style={styles.buttonTextStyle}>Cancel</Text>
                      </Pressable>
                    </View>
                </View>
                </View>
            </Modal>
            <Pressable key="{course.CRN}"  
				style = {[styles.entry, (noTimeConflict && !choseDuplicateCourse) ? {} : styles.courseConflictStyle]}
				onPress={() => {
					setModalVisible(true)
				}}
			>
				<Text style={styles.text}>
					{course.Subject + course.Number + ": " + course.Section 
						+ (course['Section Credit Hours'].length > 0 
							? 
							" (" + course['Section Credit Hours'] + ")" 
							: 
							"")
						+  (course['Credit Hours'].length > 0
							?
							" (" + course['Credit Hours'] + ")"
							:
							"")}
				</Text>
				<Text style = {styles.text}>
					{course.Type + " " + course["Days of Week"] + " | " + course["Start Time"] }
				</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
      centeredView1: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
      },
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
        fontSize: 15,
        fontWeight: "500",
        color: "#13294b",
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
    },	
	courseConflictStyle: {
		backgroundColor: '#a9a9a9'
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
      buttonTextStyle: {
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