'use strict';
import React, { Component } from 'react';
import { Container, Content, Header, Text, Title, List, ListItem, Button, Icon, InputGroup, Input, View, Spinner } from 'native-base';
import styles from './styles';
import myTheme from '../../themes/base-theme';
import { popRoute, pushNewRoute } from '../../actions/route';
import { connect } from 'react-redux';
import {
    AppRegistry,
    StyleSheet,
    TouchableHighlight} from 'react-native'

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
    popRoute() {
        this.props.popRoute();
    }

    pushNewRoute(route) {
        this.props.pushNewRoute(route);
    }
    onChange(value) {
        this.setState({ value });
    }
    render() {
        return (
        <Container theme={myTheme} style={styles.container}>
            <Header>
                <Button transparent onPress={()=>this.popRoute()}>
                    <Icon name="md-arrow-back" />
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
                                                :  <Button block info
                                                onPress={this.onPress.bind(this)}>
                                                ВОЙТИ
                                            </Button>
                                            )}
                                        </View>
                                    <View style={{ flexDirection:'row', alignSelf: 'center', marginTop: 6 }}>
                                        <Button  transparent  onPress={() => this.pushNewRoute('signup')}>Еще нет учетной записи?</Button>
                                        <Button  transparent   textStyle={{fontWeight: 'bold'}}  onPress={() => this.pushNewRoute('signup')}>Зарегистрироваться</Button>
                                    </View>
                                    </View>
                            </Content>
                        </Container>



        );
    }
    onPress() {
        // call getValue() to get the values of the form
        var value = this.refs.form.getValue();

        if (value) { // if validation fails, value will be null
            this.setState({
                internet:true
            });


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
    popRoute: React.PropTypes.func,
    pushNewRoute: React.PropTypes.func

};
function bindAction(dispatch) {
    return {
        popRoute: () => dispatch(popRoute()),
        pushNewRoute: route => dispatch(pushNewRoute(route))
    };
}

export default connect(null, bindAction)(SignIn);