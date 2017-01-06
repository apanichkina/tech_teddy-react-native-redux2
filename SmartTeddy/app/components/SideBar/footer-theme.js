import { Platform } from 'react-native';

export default {

    // Line Height
    btnLineHeight: 19,
    lineHeightH1: 32,
    lineHeightH2: 27,
    lineHeightH3: 22,
    iconLineHeight: (Platform.OS === 'ios') ? 37 : 30,
    lineHeight: (Platform.OS === 'ios') ? 20 : 24,


    // List
    listBorderColor: '#fff',
    listDividerBg: '#ddd',
    listItemHeight: 55,
    listItemPadding: 0,
    listNoteColor: '#808080',
    listNoteSize: 13,

    // Icon
    iconFamily: 'Ionicons',
    iconFontSize: (Platform.OS === 'ios') ? 30 : 60,

    // Footer
    footerHeight: 55,
    footerDefaultBg: (Platform.OS === 'ios') ? '#F8F8F8' : '#fff'
};