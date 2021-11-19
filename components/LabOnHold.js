import React from "react";
import { StyleSheet, Image, Text, View, TextInput, Pressable } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, update } from 'firebase/database';


function writeUserData(crn_lec, crn_lab) {
    const db = getDatabase();
    const reference = ref(db, 'user1/' + Math.round(Date.now() / 1000));
    console.log(reference)
    update(reference, {
        title: String(crn_lec + " " + crn_lab),
    });
}

const LabOnHold = ({navigation, route}) => {

    function saveToJson() {
        writeUserData(lab.CRN, lec.CRN)
        console.log("write")
    }

    let {lab, lec} = route.params;

    return (
        <View style={styles.container}>
                <View  style={styles.title}>
                    <Text style={styles.titleText}>
                        Add Successful!
                    </Text>
                </View>
                <Image style={styles.img} source={require('../assets/greenTick.png')}/>
                <View style={styles.detailView}>
                    <Text  style={styles.detail}>
                        {lec["Name"]}
                    </Text>
                </View>
                <View style = {styles.btm}>
                    <Pressable
                            style={[styles.button, styles.buttonAdd]}
                                onPress={() => {
                                    saveToJson();
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