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
import {popToTop} from '../actions/route'
import { toggleWiFi, setWiFi, getWiFiList, setModalVisibility, setWiFiSSID, toggleWiFiActiveUnknown} from '../actions/wifi';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, List, ListItem, Button, Icon, InputGroup, Input, View, Text, Thumbnail, H1, Spinner} from 'native-base';
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

class Settings extends Component {
    static propTypes = {
        openDrawer: React.PropTypes.func,
        openModal: React.PropTypes.func
    };
    constructor (props) {
        super(props);
        this.state = {
            wifiPassword: this.props.wifiPassword,
            wifiSSID: this.props.wifiSSID,
            isActive: this.props.isWiFiActive,
            lastUpdate: Date.now()
        };
    }
    componentWillMount(){
        if (this.props.isWiFiActive) {
            this.props.getWiFiList();
        }

    }
    toggleWiFi(value){
        this.setState({isActive: value, lastUpdate: Date.now()});
       // this.props.toggleWiFiActiveUnknown();
        this.props.toggleWiFi();
        if (value) {
            this.props.getWiFiList();
        }

    }

    componentWillUpdate(nextProps, nextState) {
        if (!nextProps.name) this.props.popToTop();
        if (nextProps.isWiFiActive != this.state.isActive) {
            if (Date.now()- this.state.lastUpdate > 2000) {
                this.setState({isActive: nextProps.isWiFiActive, lastUpdate: Date.now()});
            }
        }
        //if(nextProps.isWiFiActive != this.state.isActive) {
        //    console.log('////////////////////////')
        //    this.setState({isActive: nextProps.isWiFiActive})
        //}
        //
        //if (this.state.isActive == false && nextState.isActive == true) {
        //        this.props.toggleWiFi();
        //        this.props.getWiFiList();
        //}
        //if (this.state.isActive == true && nextState.isActive == false) {
        //        this.props.toggleWiFi();
        //}
    }
    setWiFiModal(ssid, isKnown){
        this.props.setWiFiSSID(ssid);
        this.props.setModalVisibility(true)
    }
    render() {
        const { openDrawer, wifiList, isFetching, isWiFiActive, connectedWiFi} = this.props;

        return (
            <Container theme={myTheme} style={styles.container}>
                <Header>
                    <Button transparent onPress={openDrawer}>
                        <Icon name="ios-menu" />
                    </Button>
                    <Title> {strings.title}</Title>
                </Header>
                <Content>
                    <View style={styles.enableInfoWrapper}>
                        <Text style={{fontSize: 18 }}>{isWiFiActive? 'Включено' : 'Выключено'}</Text>
                        <Switch
                            onTintColor="#00ff00"
                            style={{}}
                            thumbTintColor="#0000ff"
                            tintColor="#F06292"
                            onValueChange={(value) => this.toggleWiFi(value)}
                            value={this.state.isActive} />
                    </View>
                    <View style={{padding:10}}>
                        {!isWiFiActive ?
                            <Text style={{color:'#37474F'}}>Чтобы посмотреть доступные сети, включите Wi-Fi</Text>
                            : isFetching ?
                                <Spinner style={{ alignSelf: 'center' }}/>
                                : wifiList.length ? <List dataArray={wifiList}
                                          renderRow={(item) =>
                                        <ListItem
                                            button
                                            disabled={false}
                                            onPress={()=>this.setWiFiModal(item.name, item.isKnown)}>
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
                                                        { (connectedWiFi == item.name) && <Text style={styles.status}>Подключено</Text> }
                                                    </View>
                                                </View>
                                        </ListItem>
                                        }>
                                    </List>
                            : <Text>Ничего не нашлось, попробуйте снова =) </Text>
                        }
                        {
                        /*
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

                        */}

            </View>
        </Content>
      </Container>
      )
  }
}
const mapStateToProps = (state) => {
  return {
      name: state.bear.connectedBearName,
      wifiPassword: state.wifiSet.wifiPassword,
      wifiSSID: state.wifiSet.wifiSSID,
      isWiFiActive: state.wifiSet.isWiFiActive,
      wifiList: state.wifiList.wifiList,
      isFetching: state.wifiList.isFetching,
      connectedWiFi: state.wifiSet.connectedWiFiSSID
  }
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleWiFi: () => dispatch(toggleWiFi()),
        setWiFi: (ssid, pass) => dispatch(setWiFi(ssid, pass)),
        popRoute: () => dispatch(popRoute()),
        openDrawer: () => dispatch(openDrawer()),
        getWiFiList:() => dispatch(getWiFiList()),
        setModalVisibility:(n) => dispatch(setModalVisibility(n)),
        setWiFiSSID: (ssid) => dispatch(setWiFiSSID(ssid)),
        toggleWiFiActiveUnknown: () => dispatch(toggleWiFiActiveUnknown()),
        popToTop: () => dispatch(popToTop())
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