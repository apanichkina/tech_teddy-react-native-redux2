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

let strings = {
    message: 'Вы уверенны, что хотите ВЫЙТИ?'
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
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        authDiscardToken: () => dispatch(authDiscardToken()),
        popToTop: () => dispatch(popToTop()),
        isConnectedInternet: (s) => dispatch(isConnectedInternet(s))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Root);
