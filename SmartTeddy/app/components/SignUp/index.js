'use strict';

import React, { Component } from 'react';
import { Container, Content, Header, Text, Title, Button as ButtonNB, Icon, View, Spinner } from 'native-base';
import styles from './styles';
import myTheme from '../../themes/base-theme';
import { popRoute, popNRoute } from '../../actions/route';
import {fetchSignUp} from '../../actions/user'
import { connect } from 'react-redux';
import SmartScrollView from 'react-native-smart-scroll-view';
import Button from 'react-native-button';
import dismissKeyboard from 'react-native-dismiss-keyboard';

var t = require('tcomb-form-native');
var Form = t.form.Form;

var regExpLogin = new RegExp("^[a-z0-9_-]{3,16}$", 'i');
var regExpEmail = new RegExp(/.+@.+\..+/i);

var Name = t.refinement(t.String, function (str) { return str.length >= 3 &&  str.length <= 16 && regExpLogin.test(str)});
Name.getValidationErrorMessage = function () {
    return 'неверный формат логина';
};
var Email = t.refinement(t.String, function (str) { return regExpEmail.test(str)});
Email.getValidationErrorMessage = function () {
    return 'неверный формат почты';
};
var Password = t.refinement(t.String, function (str) { return str.length >= 6});
Password.getValidationErrorMessage = function () {
    return 'слишком мало символов';
};
var Password2 = t.refinement(t.String, function (str) { return str == Form.password1});
Password2.getValidationErrorMessage = function () {
    return 'пароли должны совпадать';
};

var Person = t.struct({
    name: Name,
    email: Email,
    password1: Password,
    password2: Password
});

function samePasswords(x) {
    return x.password1 === x.password2;
}

var Type = t.subtype(Person, samePasswords);
Type.getValidationErrorMessage = function (value) {
    if (!samePasswords(value)) {
        return 'Пароли должны совпадать';
    }
};

var options = {
    fields: {
        name: {
            label: 'Логин:',
            placeholder:'Ваш изумительный логин',
            help: 'от 3 до 16 латинских букв и цифр',
            underlineColorAndroid: "transparent"
        },
        email: {
            label: 'Email:',
            placeholder:'Ваша невероятная почта',
            underlineColorAndroid: "transparent"

        },
        password1: {
            label: 'Пароль:',
            placeholder:'Раз пароль',
            secureTextEntry: true,
            help: 'минимум 6 любых символов',
            underlineColorAndroid: "transparent"
        },
        password2: {
            label: 'Подтверждение пароля:',
            placeholder:'Два пароль',
            secureTextEntry: true,
            underlineColorAndroid: "transparent"
        }
    }
};

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    popRoute() {
        this.props.popRoute();
    }

    onChange(value) {
        this.setState({ value });
    }
    fetchSignUp() {
        dismissKeyboard();
        var value = this.refs.form.getValue();
        if (value) {
            this.props.fetchSignUp(value.name, value.email,value.password1, value.password2);
        }
    }
    goToSignIn() {
        dismissKeyboard();
        this.popRoute()
    }
    render() {
        const {isFetching} = this.props;
        return (
            <Container theme={myTheme} style={styles.container}>
                <Header>
                    <ButtonNB transparent onPress={()=>this.popRoute()}>
                        <Icon name="md-arrow-back" />
                    </ButtonNB>
                    <Title>Регистрация</Title>
                </Header>

                <View style={{flex:1, backgroundColor:'#ffffff'}}>
                    <SmartScrollView
                        contentContainerStyle = { styles.contentContainerStyle }
                        scrollPadding         = { 10 }>
                        <Form
                            ref="form"
                            type={Type}
                            options={options}
                            value={this.state.value}
                            onChange={this.onChange.bind(this)}
                            />
                        <View>
                            {(isFetching ? <Spinner></Spinner>
                                :   <Button
                                        containerStyle={[styles.button, {backgroundColor:myTheme.btnInfoBg, borderColor:myTheme.btnInfoBg, borderRadius: myTheme.borderRadiusBase}]}
                                        style = {[styles.buttonText, {fontFamily:myTheme.btnFontFamily, fontSize:myTheme.btnTextSize, lineHeight:myTheme.btnLineHeight, color:myTheme.btnPrimaryColor}]}
                                        onPress={() => this.fetchSignUp()}>
                                        ВОЙТИ
                                    </Button>
                            )}
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Button
                                style = {[styles.buttonText, {paddingHorizontal:5, fontWeight:'normal',fontFamily:myTheme.textFontFamily, fontSize:myTheme.btnTextSize, lineHeight:myTheme.btnLineHeight}]}
                                onPress={()=>this.goToSignIn()}>
                                Есть учетная запись?
                            </Button>
                            <Button
                                style = {[styles.buttonText, {paddingHorizontal:5,fontFamily:myTheme.btnFontFamily, fontSize:myTheme.btnTextSize, lineHeight:myTheme.btnLineHeight}]}
                                onPress={()=>this.goToSignIn()}>
                                Войти
                            </Button>
                        </View>
                    </SmartScrollView>
                </View>
            </Container>
        );
    }
}

SignUp.propTypes = {
    popRoute: React.PropTypes.func,
    popNRoute: React.PropTypes.func
};
const mapStateToProps = (state) => {
    return {
        isFetching: state.user.isSignUpFetching
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        popRoute: () => dispatch(popRoute()),
        popNRoute: (n) => dispatch(popNRoute(n)),
        fetchSignUp: (n, e, p1, p2) => dispatch(fetchSignUp(n, e, p1, p2))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);