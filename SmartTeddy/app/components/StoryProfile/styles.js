
const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#FBFAFA'
  },
  text: {
    alignSelf: 'center',
    marginBottom: 7
  },
  mb: {
    marginBottom: 25
  },
  track: {
        height: 2,
        backgroundColor: '#E0E0E0'
  },
  thumb: {
        width: 10,
        height: 10,
        backgroundColor: '#B39DDB',
        borderRadius: 10 / 2,
        shadowColor: '#B39DDB',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 2,
        shadowOpacity: 1
  },
  slider_container: {
    height: 20
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  caption: {
    //flex: 1,
  },
  value: {
    flex: 1,
    textAlign: 'right',
    marginLeft: 10,
  }
});
