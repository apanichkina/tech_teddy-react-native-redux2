
const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBFAFA'
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 30
    },
    buttonText: {
        fontSize: 18,
        alignSelf: 'center',
        color: '#212121'
    },
    preloader: {
        alignSelf: 'stretch'
    },
    button: {
        height: 38,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    contentContainerStyle: {
        padding: 20,
        backgroundColor: '#ffffff',
        alignItems: 'stretch',
        justifyContent: 'center'
    }
});