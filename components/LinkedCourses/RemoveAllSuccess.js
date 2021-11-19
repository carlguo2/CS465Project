import { View, Text, StyleSheet, Dimensions, Image, Pressable } from "react-native";
import React from "react";
import RedTick from "../../assets/redTick.png"
 
const RemoveAllSuccess = ({ navigation, route }) => {
    
    return(
        <View style={styles.viewContainer}>
            <View  style={styles.title}>
                <Text  style={styles.titleText}>Remove All Sections Successful!</Text>
            </View>
            <Image style={styles.img} source={RedTick}/>
            <View style = {styles.btm}>
                <Pressable
                    style={[styles.button, styles.buttonAdd]}
                    // disabled={noTimeConflict}
                    onPress={() => {
                        navigation.navigate('DiscussionDetail', {course: route.params.course})
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