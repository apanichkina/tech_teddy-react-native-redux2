
const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({
    container: {
        backgroundColor: '#FBFAFA',
        flex: 1

    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 30
    },
    buttonText: {
        fontSize: 18,
        color: '#ffffff',
        alignSelf: 'center'
    },
    preloader: {
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#8e44ad',
        borderColor: '#8e44ad',
        borderWidth: 3,
        borderRadius: 3,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    contentContainerStyle: {
        padding: 20,
        backgroundColor: '#ffffff',
        justifyContent: 'center'
    }
});

