import React, { Component } from 'react';
import {
  TextInput,
  StyleSheet,
  TouchableOpacity,
  RecyclerViewBackedScrollView,
  RefreshControl,
  ScrollView,
  ListView,
  Switch,
  TouchableWithoutFeedback,
} from 'react-native';
import { toggleWiFi, setWiFi} from '../actions/wifi';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, List, ListItem, Button, Icon, InputGroup, Input, View, Text, } from 'native-base';
import myTheme from '../themes/base-theme';
import { popRoute } from '../actions/route';
import TeddyBluetooth from '../BluetoothLib';
import { openDrawer } from '../actions/drawer';

var strings = {
  title: 'Настройки',
  disconnected: 'Разрыв соединения',
  wifiTitle: 'задать Wi-Fi',
  passwordTitle: 'Пароль',
  wifiNamePlaceholder: 'имя сети Wi-Fi',
  checkWifi: 'проверить соединение'
};

// 56762426

class Settings extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
  };

  constructor (props) {
    super(props);
    this.state = {
      wifiPassword: this.props.wifiPassword,
      wifiSSID: this.props.wifiSSID
    }
  }

  render() {
    const { openDrawer } = this.props;
      return (
      <Container theme={myTheme} style={styles.container}>
        <Header>
          {/* <Button transparent onPress={()=>this.props.popRoute()}>
            <Icon name="ios-arrow-back" />
          </Button> */}
          <Button transparent onPress={openDrawer}>
            <Icon name="ios-menu" />
          </Button>
          <Title> {strings.title}</Title>
        </Header>

        <Content padder>
          <Text
              style={styles.h2}>
            {strings.wifiTitle}
          </Text>
          <List>

            <ListItem>
              <InputGroup>
                <Input
                    placeholder={strings.wifiNamePlaceholder}
                    value={this.state.wifiSSID}
                    onChangeText={(text) => { this.setState({wifiSSID: text}) }} />
              </InputGroup>
            </ListItem>

            <ListItem>
              <InputGroup>
                <Input
                    placeholder='пароль'
                    secureTextEntry={true}
                    value={this.state.wifiPassword}
                    onChangeText={(text) => { this.setState({wifiPassword: text}) }} />

              </InputGroup>
            </ListItem>

            <Button
                style={{alignSelf: 'flex-end', margin: 6}}
                onPress={() => this.props.setWiFi(this.state.wifiSSID, this.state.wifiPassword)}>
              Применить
            </Button>
          </List>

          <View style={styles.enableInfoWrapper}>
            <Text style={{ fontWeight: 'bold' }}>{strings.checkWifi}</Text>
            <Switch
                onTintColor="#00ff00"
                style={{marginBottom: 10}}
                thumbTintColor="#0000ff"
                tintColor="#F06292"
                onValueChange={() => this.props.toggleWiFi()}
                value={this.props.isWiFiActive} />
          </View>
        </Content>
      </Container>
      )
  }
}
const mapStateToProps = (state) => {
  return {
    wifiPassword: state.wifi.wifiPassword,
    wifiSSID: state.wifi.wifiSSID,
    isWiFiActive: state.wifi.isWiFiActive
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleWiFi: () => dispatch(toggleWiFi()),
    setWiFi: (ssid, pass) => dispatch(setWiFi(ssid, pass)),
    popRoute: () => dispatch(popRoute()),
    openDrawer: () => dispatch(openDrawer())
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings)

const styles = StyleSheet.create({
    container: {

      backgroundColor: '#FBFAFA'

    },
    h1: {
      fontWeight: 'bold',
      fontSize: 24,
      marginVertical: 10,
      alignSelf: 'center'
    },
    h2: {
      fontWeight: 'bold',
      fontSize: 20,
      marginVertical: 5,
      alignSelf: 'flex-start'
    },
    inline: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 40,
      paddingHorizontal: 25,
      alignItems: 'center'
    },
    enableInfoWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 40,
      paddingHorizontal: 25,
      alignItems: 'center'
    }
});