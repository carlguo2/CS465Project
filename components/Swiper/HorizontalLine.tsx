import { View, StyleSheet, Dimensions } from 'react-native';
import React from 'react';

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    bar: {
        marginTop: 15,
        marginBottom: 0, 
        marginLeft: width/3, 
        marginRight: width/3,
        height: 5,
        width: width/3,
        backgroundColor: '#d3d3d3',
        borderRadius: 50
    }
})

export const HorizontalLine = () => {
    return (<View style={styles.bar}/>);
}