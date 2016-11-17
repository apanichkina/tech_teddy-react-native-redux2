'use strict';
import React, { Component } from 'react';
import { Container, Content, Text, List, ListItem, Button, Icon, InputGroup, Input, View, Spinner } from 'native-base';
import styles from './styles';
import myTheme from '../../themes/base-theme';
import {
    AppRegistry,
    StyleSheet,
    TouchableHighlight} from 'react-native'
//import SmartScrollView from 'react-native-smart-scroll-view';

//const Realm = require('realm');
//const realm = new Realm({
//    schema: [{name: 'Token', primaryKey: 'name', properties: {name: 'string', token : 'string'}}]
//});


//var MessageBarAlert = require('react-native-message-bar').MessageBar;
//var MessageBarManager = require('react-native-message-bar').MessageBarManager;

var t = require('tcomb-form-native');
var Form = t.form.Form;

var regExpLogin = new RegExp("^[a-z0-9_-]{3,16}$", 'i');

var Name = t.refinement(t.String, function (str) { return str.length >= 3 &&  str.length <= 16 && regExpLogin.test(str)});
Name.getValidationErrorMessage = function (value, path, context) {
    return 'неверный формат логина';
};
var Password = t.refinement(t.String, function (str) { return str.length >= 6});
Password.getValidationErrorMessage = function (value, path, context) {
    return 'слишком мало символов';
};

var Person = t.struct({
    name: Name,
    password: Password
});

var options = {

    fields: {
        name: {
            label: 'Логин:',
            placeholder:'Логин',
            underlineColorAndroid: "transparent"
        },
        password: {
            label: 'Пароль:',
            placeholder:'Пароль',
            secureTextEntry: true,
            underlineColorAndroid: "transparent"
        }
    }
};

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            internet:false
        };
    }
    onChange(value) {
        this.setState({ value });
    }
    render() {
        return (
        <Container theme={myTheme} style={styles.container}>
            <Header>
                <Button transparent onPress={this.props.openDrawer}>
                    <Icon name="ios-menu" />
                </Button>
                <Title>Авторизация</Title>
            </Header>
                            <Content padder>
                                <View>

                                        <Form
                                            ref="form"
                                            type={Person}
                                            options={options}
                                            value={this.state.value}
                                            onChange={this.onChange.bind(this)}
                                            />



                                        <View>
                                            {(this.state.internet ? <Spinner></Spinner>
                                                :  <Button
                                                onPress={this.onPress.bind(this)}>
                                                Войти
                                            </Button>
                                            )}
                                        </View>
                                    <Button style={{alignSelf: 'center' }} onPress={console.log('Sign UP')}>Зарегестрироваться</Button>
                                </View>
                            </Content>
                        </Container>



        );
    }
    onPress() {
        //const dismissKeyboard = require('dismissKeyboard');
        //dismissKeyboard();
        // call getValue() to get the values of the form
        var value = this.refs.form.getValue();

        if (value) { // if validation fails, value will be null
            this.setState({
                internet:true
            });
            //let tokens = realm.objects('Token');
            //let FCMToken = tokens.filtered('name = "FCM"');
            //let FCMstr = "";
            //if (FCMToken.length == 1){
            //    FCMstr = FCMToken[0].token
            //}

            fetch('https://hardteddy.ru/api/user/login', {
                method: 'POST',

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: value.name,
                    password: value.password
                    //fcm: FCMstr
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    this.setState({
                        internet:false
                    });
                    if(responseJson.status == 0){
                        // Все хорошо
                        console.log('все ок')
                        //realm.write(() =>   {
                        //    realm.create('Token', {name: 'bearToken', token:responseJson.body.bearToken});
                        //    realm.create('Token', {name: 'userToken', token:responseJson.body.userToken});
                        //});
                    }
                    else{

                    }
                })
                .catch((error) => {
                    this.setState({
                        internet:false
                    });
                    if (error.message == "Network request failed")
                    {

                    }
                    else{

                    }
                });
        }
    }
}
SignIn.propTypes = {

};
export default (SignIn);