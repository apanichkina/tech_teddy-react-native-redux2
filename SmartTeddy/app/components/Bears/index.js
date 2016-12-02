import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Container, Header, Title, Content, Text, List, ListItem, Card, CardItem, Radio, Button, Icon } from 'native-base';
import Bluetooth from '../../BluetoothLib'
import { openDrawer } from '../../actions/drawer';
import { pushNewRoute, replaceRoute} from '../../actions/route';
import { searchBears, connectToDevice } from '../../actions/bluetooth';
import { setConnectedBearName, setBearStories } from '../../actions/bear';
import {enableBluetooth} from '../../actions/bluetooth'
import {pressConnectToDeviceButton} from '../../actions/connectToDeviceButton'
import styles from './styles';
import myTheme from '../../themes/base-theme';
class Bears extends Component {

    static propTypes = {
        openDrawer: React.PropTypes.func,
        pushNewRoute: React.PropTypes.func,
        searchBears: React.PropTypes.func,
        setConnectedBearName: React.PropTypes.func,
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
        this.props.connectToDevice(id, name)
            //.then(() => {
            //    this.props.replaceRoute('bear-profile');
            //})
            //.catch((err) => console.log('connectToDevice ERROR', err))
        // this.props.setConnectedBearName(name);
        // this.props.pushNewRoute('bear-profile');
    }
    enableBluetooth(){
        console.log('enableBluetooth')
        Bluetooth.getInstance().enable();
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
            connectToDeviceFetching } = this.props;
        return (
            <Container theme={myTheme} style={styles.container}>

                <Header>
                    <Button transparent onPress={this.props.openDrawer}>
                        <Icon name="ios-menu" />
                    </Button>
                    <Title>Примедведиться</Title>
                </Header>
                <Content>
                    {!bluetoothEnabled ?
                        <View>
                            <Text>Блютус не подключен</Text>
                            <Button block info onPress={()=>this.enableBluetooth()}>Подключиться</Button>
                        </View>
                        :devicesCount ? <List dataArray={bears}
                                renderRow={(item) =>
                                <ListItem button disabled={connectToDeviceButtonWaiting} onPress={()=>{this.onBearClick(item.name, item.id)}}>
                                    <Content>
                                        <View style={{ flexDirection:'row', flex: 3}}>
                                        <View style={{ flex: 2  }}>
                                        <Text style={styles.header} >{item.name}</Text>
                                        <Text style={styles.help} >{item.id}</Text>
                                        </View>
                                        <View style={{ flex: 1  }}>
                                      {connectToDeviceFetching && id == item.id ? <Text style={{color: '#00897B'}}>Подключение...</Text> : null}
                                        </View>

                                        </View>
                                    </Content>
                                </ListItem>
                            }>
                    </List>
                        : this.refresh()

                    }

                    {/* <Button style={styles.btn_search} onPress={searchBears}>
                        <Icon name='ios-search' />
                        Найти
                    </Button> */}
                </Content>
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
        id: state.connectToDeviceButton.id
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        replaceRoute: (route) => dispatch(replaceRoute(route)),
        openDrawer: () => dispatch(openDrawer()),
        pushNewRoute: route => dispatch(pushNewRoute(route)),
        setConnectedBearName: name => dispatch(setConnectedBearName(name)),
        searchBears: () => dispatch(searchBears()),
        connectToDevice: (id, name) => dispatch(connectToDevice(id, name)),
        setBearStories: () => dispatch(setBearStories()),
        enableBluetooth: () => dispatch(enableBluetooth()),
        pressConnectToDeviceButton:(id) => dispatch(pressConnectToDeviceButton(id))
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bears)