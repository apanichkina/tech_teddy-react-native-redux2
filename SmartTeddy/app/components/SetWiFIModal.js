import React, {Component} from 'react';
import { Container, Header, Title, Content, List, ListItem, Button, Icon, InputGroup, Input, View, Text, Thumbnail, H1, Spinner} from 'native-base';
import Modal from 'react-native-simple-modal';
import myTheme from '../themes/base-theme';
import { connect } from 'react-redux';
import SmartScrollView from 'react-native-smart-scroll-view';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import { setWiFi, getWiFiList, setModalVisibility, setConnectedWiFiSSID, discardWiFi} from '../actions/wifi';
var strings = {
    title: 'Wi-Fi',
    disconnected: 'Разрыв соединения',
    wifiTitle: 'задать Wi-Fi',
    passwordTitle: 'Пароль',
    wifiNamePlaceholder: 'имя сети Wi-Fi',
    checkWifi: 'проверить соединение'
};
class ModalComponent extends React.Component  {
    constructor (props) {
        super(props);
        this.state = {
            wifiPassword: '',
            offset: 0
        };
    }
    onСancel(){
        dismissKeyboard();
        this.props.discardWiFi();
        this.props.setModalVisibility(false);
    }
    setWiFi(){
        dismissKeyboard();
        this.props.setConnectedWiFiSSID('');
        this.props.setWiFi(this.props.wifiSSID,this.state.wifiPassword);
        this.props.discardWiFi();
        this.props.setModalVisibility(false);
    }
    render() {
        const {isModalVisible, wifiSSID} = this.props;
        return (
                <Modal
                    open={isModalVisible}
                    offset={this.state.offset}
                    overlayBackground={'rgba(0, 0, 0, 0.5)'}
                    animationDuration={200}
                    animationTension={40}
                    modalDidOpen={() => undefined}
                    modalDidClose={() => undefined}
                    closeOnTouchOutside={false}
                    containerStyle={{
                        justifyContent: 'center'
                    }}
                    modalStyle={{
                        borderRadius: 2,
                        margin: 20,
                        padding: 10,
                        backgroundColor: '#F5F5F5'
                    }}>
                    <List>
                        <Text style={{paddingLeft:35, fontWeight:'bold'}}>{wifiSSID}</Text>
                        <ListItem>

                            <InputGroup>
                                <Input
                                    inlineLabel
                                    label="Пароль"
                                    placeholder='Введите пароль'
                                    secureTextEntry={true}
                                    autoFocus={true}
                                    onFocus={()=>this.setState({offset: -60})}
                                    value={this.state.wifiPassword}
                                    onChangeText={(text) => { this.setState({wifiPassword: text}) }} />
                            </InputGroup>
                        </ListItem>

                    </List>

                     <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                     <Button transparent textStyle={{color:myTheme.btnPrimaryBg }} onPress={()=>this.onСancel()}> ОТМЕНА </Button>
                     <Button transparent  disabled={this.state.wifiPassword.length < 5} textStyle={this.state.wifiPassword.length < 5 ? { color: myTheme.btnDisabledClr} : {color:myTheme.btnPrimaryBg }} onPress={() => this.setWiFi()}> ПОДКЛЮЧИТЬСЯ </Button>
                     </View>


                </Modal>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        isModalVisible: state.wifiSet.isModalVisible,
        wifiSSID: state.wifiSet.wifiSSID
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setModalVisibility: (n) => dispatch(setModalVisibility(n)),
        setWiFi:(ssid, pass) => dispatch(setWiFi(ssid, pass)),
        setConnectedWiFiSSID: (n) => dispatch(setConnectedWiFiSSID(n)),
        discardWiFi:() => dispatch(discardWiFi())

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
