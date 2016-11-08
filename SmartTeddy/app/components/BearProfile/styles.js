
const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({

    actionButton: {
        position: 'absolute',
        zIndex: 100
    },
    container: {
        backgroundColor: '#FBFAFA'
    },
    addButton: {
        backgroundColor: '#F06292',
        borderColor: '#F06292',
        borderWidth: 1,
        height: 50,
        width: 50,
        bottom:16,
        right:16,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        zIndex: 100,
        shadowOffset: {
            height: 1,
            width: 0
        }
    }
});