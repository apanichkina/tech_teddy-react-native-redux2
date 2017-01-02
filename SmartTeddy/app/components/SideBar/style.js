const React = require('react-native');

const { StyleSheet, Platform, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
    sidebar: {
        flex: 1,
        backgroundColor: '#fff'
    },
    drawerCover: {
        alignSelf: 'stretch',
        // resizeMode: 'cover',
        height: 127,
        width: null,
        position: 'relative',
        marginBottom: 10
    },
    drawerImage: {
        position: 'absolute',
        // left: (Platform.OS === 'android') ? 30 : 40,
        left: (Platform.OS === 'android') ? deviceWidth / 10 : deviceWidth / 9,
        // top: (Platform.OS === 'android') ? 45 : 55,
        top: (Platform.OS === 'android') ? deviceHeight / 13 : deviceHeight / 12,
        width: 97,
        resizeMode: 'cover'
    },
    backdropView: {
        backgroundColor: 'rgba(0,0,0,0)',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    },
    headline: {
        padding: 16,
        fontSize: 18,
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'white'
    },
    listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    iconContainer: {
        width: 37,
        height: 37,
        borderRadius: 18,
        marginRight: 12,
        backgroundColor: '#fff',
        paddingTop: (Platform.OS === 'android') ? 7 : 5
    },
    sidebarIcon: {
        fontSize: 26,
        color: '#757575',
        lineHeight: 23,
        backgroundColor: 'transparent'
    },
    text: {
        fontWeight: '500',
        fontSize: 16,
        color: '#212121'
    },
    activeItem: {
        backgroundColor: '#CCCCCC'
    },
    connectedBear: {
        color: '#00897B', //Accent #FFB74D
        fontWeight: '500',
        fontSize: 16
    }
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