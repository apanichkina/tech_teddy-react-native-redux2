import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Container, Header, Title, Content, Text, List, ListItem, Card, CardItem, Radio, Button, Icon, Thumbnail } from 'native-base';
import Bluetooth from '../../BluetoothLib'
import { openDrawer } from '../../actions/drawer';
import { pushNewRoute, replaceRoute} from '../../actions/route';
import { searchBears, connectToDevice, disconnectFromDevice, enableBluetoot } from '../../actions/bluetooth';
import { setBearStories } from '../../actions/bear';
import {pressConnectToDeviceButton} from '../../actions/connectToDeviceButton'
import styles from './styles';
import myTheme from '../../themes/base-theme';
class Bears extends Component {

    static propTypes = {
        openDrawer: React.PropTypes.func,
        pushNewRoute: React.PropTypes.func,
        searchBears: React.PropTypes.func,
        connectToDevice: React.PropTypes.func,
        setBearStories: React.PropTypes.func,
        pressConnectToDeviceButton: React.PropTypes.func
    };
    constructor(props) {
        super(props);
        this.props.searchBears();
    }
    refresh(){
       this.props.searchBears();
    }
    onBearClick(name, id) {
        this.props.pressConnectToDeviceButton(id);
        this.props.connectToDevice(id, name);
            //.then(() => {
            //    this.props.replaceRoute('bear-profile');
            //})
            //.catch((err) => console.log('connectToDevice ERROR', err))
        // this.props.setConnectedBearName(name);
        // this.props.pushNewRoute('bear-profile');
    }
    componentWillReceiveProps(nextProps){
        if (this.props.bluetoothEnabled != nextProps.bluetoothEnabled) this.props.searchBears();
    }
    enableBluetooth(){
        Bluetooth.getInstance().enable();
        this.props.searchBears();
       // this.props.searchBears();
        //this.props.enableBluetooth();
    }
    render() {
        const {
            bears,
            bluetoothEnabled,
            devicesCount,
            connectToDeviceButtonWaiting,
            id,
            connectToDeviceFetching,
            connectedBearId
            } = this.props;
        return (
            <Container theme={myTheme} style={styles.container}>
                <Header>
                    <Button transparent onPress={this.props.openDrawer}>
                        <Icon name="ios-menu" />
                    </Button>
                    <Title>Поиск устройств</Title>
                </Header>
                    {!bluetoothEnabled ?
                        <View style={{padding:10, flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} >
                            <Thumbnail style={{tintColor:'#9E9E9E',marginTop:-30}} square size={130} source={require('../../../img/bluetooth.png')}/>
                            <Text style={{  textAlign: 'center',color:'#9E9E9E', marginBottom:20}}>Блютус выключен</Text>
                            <Button style={{ alignSelf: 'center', margin:6 }} info onPress={() => this.enableBluetooth()}>ВКЛЮЧИТЬ</Button>
                        </View>
                        :devicesCount ?
                            <Content padder>
                                <List dataArray={bears}
                                        renderRow={(item) =>
                                        <ListItem
                                            button
                                            disabled={connectToDeviceButtonWaiting || connectToDeviceFetching }
                                            onPress={(connectedBearId == item.id) ?
                                                        () => this.props.pushNewRoute('bear-profile')
                                                        : () => this.onBearClick(item.name, item.id)}>
                                                <View>
                                                    <Text style={[styles.header, connectedBearId == item.id ? {color:'#00897B'} : null]} >{item.name}</Text>
                                                    <Text style={[styles.help, connectedBearId == item.id ? {color:'#00897B'} : null]} >{item.id}</Text>
                                                    <Text style={styles.status}>{connectedBearId == item.id ? 'Подключено' : connectToDeviceFetching && id == item.id ? 'Подключение...' : ' '}</Text>
                                                </View>
                                        </ListItem>
                                    }>
                                </List>
                                {connectedBearId !== '' &&
                                    <Button
                                        style={{ alignSelf: 'center', margin:6 }}
                                        info
                                        onPress={() => this.props.disconnectFromDevice()}>ОТКЛЮЧИТЬСЯ
                                    </Button>
                                }
                                </Content>
                        :  <View style={{padding:10, flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} >
                            <Thumbnail style={{marginTop:-30}} square size={130} source={require('../../../img/tumbleweed.png')}/>
                            <Text style={{  textAlign: 'center'}}>Нет соединенных устройств</Text>
                            <Text style={{  textAlign: 'center',color:'#9E9E9E', marginBottom:20}}>Подключитесь к устройству в настройках</Text>
                            <Button style={{ alignSelf: 'center', margin:6 }} info onPress={() => this.refresh()}>ОБНОВИТЬ СПИСОК</Button>
                           </View>
                    }
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        bears: state.bluetooth.searchBears,
        devicesCount: Object.keys(state.bluetooth.searchBears).length,
        bluetoothEnabled: state.bluetooth.bluetoothEnabled,
        connectToDeviceButtonWaiting: state.connectToDeviceButton.isWaiting,
        connectToDeviceFetching: state.connectToDeviceButton.isFetching,
        id: state.connectToDeviceButton.id,
        connectedBearId: state.bluetooth.bluetoothConnected ? state.bear.connectedBearId : ''
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        replaceRoute: (route) => dispatch(replaceRoute(route)),
        openDrawer: () => dispatch(openDrawer()),
        pushNewRoute: route => dispatch(pushNewRoute(route)),
        searchBears: () => dispatch(searchBears()),
        connectToDevice: (id, name) => dispatch(connectToDevice(id, name)),
        setBearStories: () => dispatch(setBearStories()),
        enableBluetooth: () => dispatch(enableBluetooth()),
        pressConnectToDeviceButton:(id) => dispatch(pressConnectToDeviceButton(id)),
        disconnectFromDevice: () => dispatch(disconnectFromDevice())
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bears)