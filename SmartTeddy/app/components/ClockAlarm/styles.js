
const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBFAFA',
        paddingBottom: 50
    },
    inlineH0: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 80,
        paddingHorizontal: 25,
        alignItems: 'center'
    },
    inline: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        paddingHorizontal: 25,
        alignItems: 'center'
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 24,
        marginVertical: 10,
        alignSelf: 'center'
    },
    alarm: {
        width: 40,
        height: 40
    },
    time: {
        fontWeight: 'bold',
        fontSize: 44
    },
    active: {
        color: '#B39DDB'
    },
    inactive: {
        color: '#cccccc'
    },
    days: {
        fontWeight: 'bold',
        fontSize: 24
    },
    activeImg: {
        tintColor: '#B39DDB'
    },
    inactiveImg: {
        tintColor: '#cccccc'
    }
});