import { View, StyleSheet } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
    bar: {
        marginTop: 25,
        marginBottom: 0, 
        marginLeft: 15, 
        marginRight: 0,
        height: 1,
        width: 100,
        backgroundColor: '#d3d3d3'
    }
})

export const HorizontalLine = () => {
    return (<View style={styles.bar}/>);
}