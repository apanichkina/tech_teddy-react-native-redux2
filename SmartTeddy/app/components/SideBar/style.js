const React = require('react-native');

const { StyleSheet, Platform, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
    sidebar: {
        flex: 1,
        backgroundColor: '#fff',
    },
    drawerCover: {
        alignSelf: 'stretch',
        // resizeMode: 'cover',
        backgroundColor: '#B39DDB',
        height: deviceHeight / 3.5,
        width: null,
        position: 'relative',
        marginBottom: 10,
    },
    drawerImage: {
        position: 'absolute',
        // left: (Platform.OS === 'android') ? 30 : 40,
        left: (Platform.OS === 'android') ? deviceWidth / 10 : deviceWidth / 9,
        // top: (Platform.OS === 'android') ? 45 : 55,
        top: (Platform.OS === 'android') ? deviceHeight / 13 : deviceHeight / 12,
        width: 97,
        resizeMode: 'cover',
    },
    listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    iconContainer: {
        width: 37,
        height: 37,
        borderRadius: 18,
        marginRight: 12,
        paddingLeft: 11,
        backgroundColor: '#fff',
        paddingTop: (Platform.OS === 'android') ? 7 : 5,
    },
    sidebarIcon: {
        fontSize: 21,
        color: '#000000',
        lineHeight: 25,
        backgroundColor: 'transparent',
    },
    text: {
        fontWeight: '500',
        fontSize: 16,
    },
    // sidebar: {
    //   flex: 1,
    //   backgroundColor: '#fff',
    //   shadowColor: '#000',
    //   shadowOffset: { width: 30 },
    //   shadowRadius: 60,
    //   shadowOpacity: 0.3,
    // },

    // sidebar: {
    //   flex: 1,
    //   backgroundColor: '#fff',
    //   shadowColor: '#000',
    //   shadowOffset: { width: 1 },
    //   shadowRadius: 4,
    //   shadowOpacity: 0.4,
    // },
});