/**
 * Created by ihelos on 06.01.17.
 */

const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({
    content:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    button: {
        height: 50,
        width: 50,
        margin:10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
});