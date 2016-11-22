import React, {Component} from 'react';
import AppNavigator from './AppNavigator'
import {
    TouchableOpacity,
    View,
    Text
    } from 'react-native'
import { connect } from 'react-redux';
import Modal from '../components/Modal';
import { authDiscardToken } from '../actions/user';
import {popToTop} from '../actions/route'
import {authSetToken} from '../actions/user'
import TokenService from '../database/tokenService'
let strings = {
    message: 'Вы уверенны, что хотите ВЫЙТИ?'
};

class Root extends React.Component  {

    constructor (props) {
        super(props);
        this.state = {
            isModalVisible: false
        };

        let userToken = TokenService.getByName('userToken').token;
        if (userToken){
            this.props.authSetToken(userToken)
        }
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
        authSetToken: (token) =>dispatch(authSetToken(token))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Root);
