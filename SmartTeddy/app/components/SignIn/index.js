'use strict';
import React, { Component } from 'react';
import { Container, Content, Header, Text, Title, Button as ButtonNB, Icon, View, Spinner } from 'native-base';
import styles from './styles';
import myTheme from '../../themes/base-theme';
import { popRoute, pushNewRoute } from '../../actions/route';
import { fetchSignIn, socialSignIn } from '../../actions/user';
import { connect } from 'react-redux';
import SmartScrollView from 'react-native-smart-scroll-view';
import Button from 'react-native-button';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import { Col, Row, Grid } from "react-native-easy-grid";
import SocialButtons from "../Social/socialLoginButtons";

var t = require('tcomb-form-native');
var Form = t.form.Form;

var regExpEmail = new RegExp(/.+@.+\..+/i);

var Email = t.refinement(t.String, function (str) { return regExpEmail.test(str)});
Email.getValidationErrorMessage = function () {
    return 'неверный формат почты';
};
var Password = t.refinement(t.String, function (str) { return str.length >= 6});
Password.getValidationErrorMessage = function () {
    return 'слишком мало символов';
};

var Person = t.struct({
    email: Email,
    password: Password
});

var options = {

    fields: {
        email: {
            label: 'Почта:',
            placeholder:'Почта',
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
        this.state = {};
    }
    popRoute() {
        this.props.popRoute();
    }

    pushNewRoute(route) {
        this.props.pushNewRoute(route);
    }
    fetchSignIn() {
        dismissKeyboard();
        var value = this.refs.form.getValue();
        if (value) {
            this.props.fetchSignIn(value.email, value.password);
        }
    }
    goToSignUp() {
        dismissKeyboard();
        this.pushNewRoute('signup')
    }
    goToSocial(name) {
        dismissKeyboard();
        this.props.socialSignIn(name)
    }
    onChange(value) {
        this.setState({ value });
    }
    render() {
        const {isFetching} = this.props;
        return (
        <Container theme={myTheme} style={styles.container}>
            <Header>
                <ButtonNB transparent onPress={()=>this.popRoute()}>
                    <Icon name="md-arrow-back" />
                </ButtonNB>
                <Title>Авторизация</Title>
            </Header>
            <View style={{flex:1, backgroundColor:'#ffffff'}}>
                <SmartScrollView
                    contentContainerStyle = { styles.contentContainerStyle }
                    scrollPadding         = { 10 }>
                    <Form
                        ref="form"
                        type={Person}
                        options={options}
                        value={this.state.value}
                        onChange={this.onChange.bind(this)}
                        />
                    <View>
                        {(isFetching ? <Spinner style={{height:38, marginBottom: 10}}></Spinner>
                            :   <Button
                            containerStyle={[styles.button, {backgroundColor:myTheme.btnInfoBg, borderColor:myTheme.btnInfoBg, borderRadius: myTheme.borderRadiusBase}]}
                            style = {[styles.buttonText, {fontFamily:myTheme.btnFontFamily, fontSize:myTheme.btnTextSize, lineHeight:myTheme.btnLineHeight, color:myTheme.btnPrimaryColor}]}
                            onPress={() => this.fetchSignIn()}>
                            ВОЙТИ
                        </Button>
                        )}
                    </View>
                    <Grid>
                        <Col size={1}><Button
                            style = {[styles.buttonText, {fontWeight:'normal',fontFamily:myTheme.textFontFamily, fontSize:myTheme.btnTextSize, lineHeight:myTheme.btnLineHeight}]}
                            onPress={()=>this.goToSignUp()}>
                            Еще нет учетной записи?
                        </Button></Col>
                        <Col size={1}><Button
                            style = {[styles.buttonText, {fontFamily:myTheme.btnFontFamily, fontSize:myTheme.btnTextSize, lineHeight:myTheme.btnLineHeight}]}
                            onPress={()=>this.goToSignUp()}>
                            Зарегистрироваться
                        </Button></Col>
                    </Grid>
                    <SocialButtons
                        VKEvent={()=>this.goToSocial("vk")}
                        FBEvent={()=>this.goToSocial("fb")}
                        OKEvent={()=>this.goToSocial("ok")}/>
                </SmartScrollView>
            </View>
        </Container>
        );
    }


}
SignIn.propTypes = {
    popRoute: React.PropTypes.func,
    pushNewRoute: React.PropTypes.func,
    fetchSignIn: React.PropTypes.func

};
const mapStateToProps = (state) => {
    return {
        isFetching: state.user.isSignInFetching
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        popRoute: () => dispatch(popRoute()),
        pushNewRoute: route => dispatch(pushNewRoute(route)),
        fetchSignIn: (e,p) => dispatch(fetchSignIn(e,p)),
        socialSignIn: (name) => dispatch(socialSignIn(name))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);