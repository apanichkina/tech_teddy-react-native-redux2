
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
        alignSelf: 'center',
        color: '#212121'
    },
    preloader: {
        alignSelf: 'center'
    },
    button: {
        height: 38,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    contentContainerStyle: {
        padding: 10,
        backgroundColor: '#ffffff',
        justifyContent: 'center'
    }
});

