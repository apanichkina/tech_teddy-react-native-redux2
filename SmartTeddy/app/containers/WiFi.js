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
import { toggleWiFi, setWiFi, getWiFiList} from '../actions/wifi';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, List, ListItem, Button, Icon, InputGroup, Input, View, Text, Thumbnail, H1} from 'native-base';
import myTheme from '../themes/base-theme';
import { popRoute } from '../actions/route';
import TeddyBluetooth from '../BluetoothLib';
import { openDrawer } from '../actions/drawer';

var strings = {
  title: 'Wi-Fi',
  disconnected: 'Разрыв соединения',
  wifiTitle: 'задать Wi-Fi',
  passwordTitle: 'Пароль',
  wifiNamePlaceholder: 'имя сети Wi-Fi',
  checkWifi: 'проверить соединение'
};

// 56762426
var wifiListDef = ['MGTS_832:-84:0','homeM:-71:0','mgts-135:-83:0', 'onlime140:-71:0', 'deniska:-85:0' ]

class Settings extends Component {
    static propTypes = {
        openDrawer: React.PropTypes.func
    };
    constructor (props) {
        super(props);
        //this.wifiList = [];
        this.state = {
          wifiPassword: this.props.wifiPassword,
          wifiSSID: this.props.wifiSSID
        };
        var wifiListDef = ['MGTS_832:-14:0','homeM:-101:0','mgts-135:-83:0', 'onlime140:-71:0', 'deniska:-85:0' ]
        var list=[];
        wifiListDef.forEach(function (item, index, array) {
            item = item.split(':');
            let temp = {};
            temp.name = item[0];
            let signal = item[1];
            if (signal > -44) {
                temp.signal = 3;
            } else {
                if (signal > -90) {
                    temp.signal = 2;
                } else {
                    temp.signal = 1;
                }
            }
            temp.isKnown = (item[2] === '1');
            list.push(temp)
        });
        this.wifiList=list;
    }
    componentWillMount(){
        this.props.getWiFiList();

    }
    render() {
        const { openDrawer } = this.props;
        console.log(this.wifiList)
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

        <Content>
            {/*

            */}
            <View style={styles.enableInfoWrapper}>
                <Text style={{fontSize: 18 }}>Включено</Text>
                <Switch
                    onTintColor="#00ff00"
                    style={{}}
                    thumbTintColor="#0000ff"
                    tintColor="#F06292"
                    onValueChange={() => this.props.toggleWiFi()}
                    value={this.props.isWiFiActive} />
            </View>
            <View style={{padding:10}}>
                <Text style={{color:'#37474F'}}>Чтобы посмотреть доступные сети, включите Wi-Fi</Text>
                <List dataArray={this.wifiList}
                      renderRow={(item) =>
             <ListItem
             button
             disabled={false}
             onPress={()=>console.log('please,set wifi')}>
             <View style={{flexDirection:'row'}}>
             {
             item.signal == 3 ?
                 <Thumbnail style={{}} square size={30} source={require('../../img/wifi/wifi-hight-signal.png')}/>
                 : item.signal == 2 ?
                     <Thumbnail style={{}} square size={30} source={require('../../img/wifi/wifi-medium-signal.png')}/>
                     :  <Thumbnail style={{}} square size={30} source={require('../../img/wifi/wifi-low-signal.png')}/>
             }

             <View style={{marginLeft:10}}>
                <Text style={{}} >{item.name}</Text>
                <Text style={styles.status}>Подключено</Text>
             </View>
             </View>
             </ListItem>
             }>
                </List>




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
                        ПРИМЕНИТЬ
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
    openDrawer: () => dispatch(openDrawer()),
      getWiFiList:() => dispatch(getWiFiList())
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
    header: {
        fontSize: 24,
        lineHeight: 30
    },
    status:{
        color: '#9E9E9E',
        fontSize: 13,
        lineHeight: 15
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
        backgroundColor: '#EEEEEE',
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 56,
      padding: 10,
      alignItems: 'center',
        elevation: 1
    }
});