import React from "react";
import { StyleSheet, Image, Text, View } from 'react-native';
import { getDatabase, ref, update } from 'firebase/database';
// @ts-ignore
import GreenTick from '../../assets/greenTick.png';
import { CourseType } from "../Swiper/CourseViews/CourseType";


function writeUserData(crn_lec: number, crn_lab: number | null) {
    const db = getDatabase();
    const reference = ref(db, 'carlguo2/' + Math.round(Date.now() / 1000));
    update(reference, {
        title: crn_lab ? String(crn_lec + " " + crn_lab) : String(crn_lec),
    });
}

interface LabOnHoldProps {
    navigation: any,
    route: any
}

interface LabOnHoldRouteParams {
    lab: CourseType,
    lec: CourseType
}

const LabOnHold: React.FC<LabOnHoldProps> = ({
    navigation, 
    route
}) => {
    let {lab, lec} : LabOnHoldRouteParams = route.params;

    function saveToJson() {
        writeUserData(lec.CRN, lab.CRN)
    }
    saveToJson();

    setTimeout(() => {
        navigation.navigate('ProfileScreen', {})
    }, 1500)

    return (
        <View style={styles.container}>
            <View  style={styles.title}>
                <Text style={styles.titleText}>
                    Add Successful!
                </Text>
            </View>
            <Image style={styles.img} source={GreenTick}/>
        </View>
    )
}

export default LabOnHold

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: "center",
        backgroundColor: "#fff",
        height: "100%"
    },
    title: {
        marginBottom: "15%"
    },
    titleText: {
        marginTop: "15%",
        fontSize: 30
    },
    img: {
        width: 100,
        height: 100,
        alignContent: "center",
    }
})