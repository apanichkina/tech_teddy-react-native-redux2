
const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  imageContainer: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#ffffff'
  },
  logoContainer: {
    flex: 1,
    marginTop: deviceHeight / 8,
    marginBottom: 30,
    alignItems: 'center'
  },
  logo: {
    top: (Platform.OS === 'android') ? 115 : 140,
    width: 150,
    height: 150
  },
  text: {
    top: (Platform.OS === 'android') ? 120 : 130,
    bottom: 10
  }
});
