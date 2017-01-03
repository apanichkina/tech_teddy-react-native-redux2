import React, {Component} from 'react';
import AppNavigator from './AppNavigator'
import {
    TouchableOpacity,
    View,
    Text,
    NetInfo
    } from 'react-native'
import { connect } from 'react-redux';
import Modal from '../components/Modal';
import { authDiscardToken } from '../actions/user';
import {popToTop} from '../actions/route'
import {isConnectedInternet} from '../actions/internet'
import {setErrorNotVisible} from '../actions/error'
import Toast from 'react-native-root-toast';
let strings = {
    message: 'Вы уверенны, что хотите ВЫЙТИ из учетной записи?'
};

class Root extends React.Component  {

    constructor (props) {
        super(props);
        this.state = {
            isModalVisible: false
        };

    }
    componentDidMount() {
        NetInfo.isConnected.fetch().then(isConnected => {
            let state = isConnected ? true : false;
            this.props.isConnectedInternet(state);
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));
        });
        NetInfo.isConnected.addEventListener(
            'change',
            this.handleFirstConnectivityChange.bind(this)
        );
    }
    componentDidUpdate(){
        console.log("DidUpdate");
        if (this.props.isErrorVisible) this.show();
    }

    componentWillUnmount(){
        NetInfo.isConnected.removeEventListener(
            'change',
            this.handleFirstConnectivityChange
        );
    }

    handleFirstConnectivityChange(isConnected) {
        let state = isConnected ? true : false;
        this.props.isConnectedInternet(state);
        console.log('Then, internet is ' + (isConnected ? 'online' : 'offline'));
    }

    logout() {
        this.props.authDiscardToken();
        this.props.popToTop();

    }
    openModal() {
        this.setState({isModalVisible: true});
    }
    onConfurmModal() {
        this.logout();
        this.setState({isModalVisible: false});
        console.log('Confurm')
    }
    onСancelModal(){
        this.setState({isModalVisible: false});
        console.log('Cancel')
    }
    show = () =>{
        let message = this.props.errorMessage;
        this.toast = Toast.show(message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: false,
            animation: true,
            hideOnPress: true,
            delay: 0,
            backgroundColor: '#424242', //#616161 более светлый
            shadowColor: null,
            textColor: null,
            onHide: () => {
                this.props.setErrorNotVisible();
            }
        });
    };
    render() {

        return (
            <View style={{flex:1}}>
                <AppNavigator
                    style={{flex:1}}
                    openModal={() =>{this.openModal()}}
                    />
                <Modal
                    isVisible={this.state.isModalVisible}
                    messageText={strings.message}
                    onConfurm={() =>{this.onConfurmModal()}}
                    onСancel={() =>{this.onСancelModal()}}
                    />

            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isErrorVisible: state.error.isVisible,
        errorMessage: state.error.message
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        authDiscardToken: () => dispatch(authDiscardToken()),
        popToTop: () => dispatch(popToTop()),
        isConnectedInternet: (s) => dispatch(isConnectedInternet(s)),
        setErrorNotVisible: () => dispatch(setErrorNotVisible())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Root);
