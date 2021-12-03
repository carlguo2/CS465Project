import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
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

    setTimeout(() => {
        navigation.navigate('LinkedSectionDetails', 
            {lectureCourse: course, courseList: courseList})
    }, 1500);   

    return(
        <View style={styles.viewContainer}>
            <View  style={styles.title}>
                <Text  style={styles.titleText}>Remove All Sections Successful!</Text>
            </View>
            <Image style={styles.img} source={RedTick}/>
        </View>
    );
};

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    viewContainer: {
        backgroundColor: '#F2F3C833',
        height: height,
        width: width,
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center'
    },     
    title: {
        marginBottom: "15%"
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