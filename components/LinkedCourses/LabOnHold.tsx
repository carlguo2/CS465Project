import React from "react";
import { StyleSheet, Image, Text, View, Pressable } from 'react-native';
import { getDatabase, ref, update } from 'firebase/database';
// @ts-ignore
import GreenTick from '../../assets/greenTick.png';
import { CourseType } from "../Swiper/CourseViews/CourseType";


function writeUserData(crn_lec: number, crn_lab: number | null) {
    const db = getDatabase();
    const reference = ref(db, 'carlguo2/' + Math.round(Date.now() / 1000));
    console.log(crn_lec, " ", crn_lab)
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

    return (
        <View style={styles.container}>
                <View  style={styles.title}>
                    <Text style={styles.titleText}>
                        Add Successful!
                    </Text>
                </View>
                <Image style={styles.img} source={GreenTick}/>
                <View style={styles.detailView}>
                    <Text  style={styles.detail}>
                        {lec["Name"]}
                    </Text>
                </View>
                <View style = {styles.btm}>
                    <Pressable
                            style={[styles.button, styles.buttonAdd]}
                                onPress={() => {
                                    navigation.navigate('ProfileScreen', {})
                                }}
                            >
                    <Text style={styles.textStyle}>Done</Text>
                    </Pressable>
                </View>
            </View>
    )
}

export default LabOnHold

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
        fontSize: 20,
        flex: 1,
        textAlign: "center"
    }
})