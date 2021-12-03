import { View, Text, StyleSheet, Dimensions, Image, Pressable } from "react-native";
import React from "react";
//@ts-ignore
import RedTick from "../../assets/redTick.png"
import { CourseType } from "../Swiper/CourseViews/CourseType";

interface RemoveAllSuccessProps {
    navigation: any,
    route: any
}

interface RemoveAllSuccessRouteParams {
    course: CourseType,
    courseList: Array<CourseType>
}
 
const RemoveAllSuccess: React.FC<RemoveAllSuccessProps> = ({ 
    navigation, 
    route 
}) => {
    const { course, courseList }: RemoveAllSuccessRouteParams = route.params;

    return(
        <View style={styles.viewContainer}>
            <View  style={styles.title}>
                <Text  style={styles.titleText}>Remove All Sections Successful!</Text>
            </View>
            <Image style={styles.img} source={RedTick}/>
            <View style = {styles.btm}>
                <Pressable
                    style={[styles.button, styles.buttonAdd]}
                    onPress={() => {
                        navigation.navigate('DiscussionDetail', 
                            {lectureCourse: course, courseList: courseList})
                    }}
                >
                    <Text style={styles.textStyle}>Next</Text>
                </Pressable>
            </View>
        </View>
    );
};

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
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
    viewContainer: {
        backgroundColor: '#F2F3C833',
        height: height,
        width: width,
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center'
    },     
    title: {

    },
    titleText: {
        marginTop: "15%",
        fontSize: 30
    },
    img: {
        marginTop: 160,
        width: 130,
        height: 132,
        alignContent: "center"
    }
});

export default RemoveAllSuccess;