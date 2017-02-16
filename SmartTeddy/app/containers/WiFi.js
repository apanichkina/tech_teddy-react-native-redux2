import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {popToTop} from '../actions/route'
import { getWiFiList, setModalVisibility, setWiFiSSID} from '../actions/wifi';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, List, ListItem, Button, Icon, InputGroup, Input, View, Text, Thumbnail, H1, Spinner} from 'native-base';
import myTheme from '../themes/base-theme';
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
            wifiSSID: this.props.wifiSSID
        };
    }
    componentWillMount(){
        this.props.getWiFiList();
    }

    componentWillUpdate(nextProps, nextState) {
        if (!nextProps.name) this.props.popToTop();
    }
    setWiFiModal(ssid){
        this.props.setWiFiSSID(ssid);
        this.props.setModalVisibility(true)
    }
    render() {
        const { openDrawer, wifiList, isFetching, connectedWiFi, status} = this.props;
        let statusMessage = '';
        switch(status) {
            case '1':
                statusMessage = 'Подключение...';
                break;
            case '2':
                statusMessage = 'Подключение...';
                break;
            case '3':
                statusMessage = 'Нет подключения к интернету';
                break;
            case '4':
                statusMessage = 'Подключен';
                break;
            default:
                statusMessage = '';
                break;
        }
        return (
            <Container theme={myTheme} style={styles.container}>
                <Header>
                    <Button transparent onPress={openDrawer}>
                        <Icon name="ios-menu" />
                    </Button>
                    <Title> {strings.title}</Title>
                </Header>
                <Content>
                    <View style={{padding:10}}>
                        { isFetching ?
                                <Spinner style={{ alignSelf: 'center' }}/>
                                : wifiList.length ? <List dataArray={wifiList}
                                          renderRow={(item) =>
                                        <ListItem
                                            button
                                            disabled={false}
                                            onPress={()=>this.setWiFiModal(item.name)}>
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
                                                        {
                                                        (connectedWiFi == item.name) ?
                                                            <Text style={styles.status}>{statusMessage}</Text>
                                                            : null
                                                        }
                                                    </View>
                                                </View>
                                        </ListItem>
                                        }>
                                    </List>
                            : <Text>Ничего не нашлось, попробуйте снова =) </Text>
                            }
                        <View>
                            { !isFetching && <Button style={{ alignSelf: 'center', margin:6 }} onPress={()=>{this.props.getWiFiList()}}>Найти сети</Button>}
                        </View>
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
      wifiList: state.wifiList.wifiList,
      isFetching: state.wifiList.isFetching,
      connectedWiFi: state.wifiSet.connectedWiFiSSID,
      status: state.wifiSet.status
  }
};

const mapDispatchToProps = (dispatch) => {
    return {
        openDrawer: () => dispatch(openDrawer()),
        getWiFiList:() => dispatch(getWiFiList()),
        setModalVisibility:(n) => dispatch(setModalVisibility(n)),
        setWiFiSSID: (ssid) => dispatch(setWiFiSSID(ssid)),
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