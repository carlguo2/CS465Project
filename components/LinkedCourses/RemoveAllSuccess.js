import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
import RedTick from "../../assets/redTick.png"
 
const RemoveAllSuccess = ({ navigation, route }) => {
    return(
        <View style={styles.viewContainer}>
            <Text>Remove All Sections Successful!</Text>
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
        justifyContent: 'center',
        alignItems: 'center'
    },     
    img: {
        width: 100,
        height: 100,
        alignContent: "center"
    }
});

export default RemoveAllSuccess;