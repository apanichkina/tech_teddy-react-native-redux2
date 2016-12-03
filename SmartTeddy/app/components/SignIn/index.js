'use strict';
import React, { Component } from 'react';
import { Container, Content, Header, Text, Title, Button, Icon, View, Spinner } from 'native-base';
import styles from './styles';
import myTheme from '../../themes/base-theme';
import { popRoute, pushNewRoute } from '../../actions/route';
import { fetchSignIn } from '../../actions/user';
import { connect } from 'react-redux';

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
        this.state = {};
    }
    popRoute() {
        this.props.popRoute();
    }

    pushNewRoute(route) {
        this.props.pushNewRoute(route);
    }
    fetchSignIn() {
        var value = this.refs.form.getValue();
        if (value) {
            this.props.fetchSignIn(value.name, value.password);
            //this.props.popRoute();
        }
    }


    onChange(value) {
        this.setState({ value });
    }
    render() {
        const {isFetching} = this.props;
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
                        {(isFetching ? <Spinner></Spinner>
                            :  <Button block info onPress={() => this.fetchSignIn()}>
                                        ВОЙТИ
                                </Button>
                        )}
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Button  transparent  onPress={() => this.pushNewRoute('signup')}>Еще нет учетной записи?</Button>
                        <Button  transparent   textStyle={{fontWeight: 'bold'}}  onPress={() => this.pushNewRoute('signup')}>Зарегистрироваться</Button>
                    </View>
                </View>
            </Content>
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
        fetchSignIn: (n,p) => dispatch(fetchSignIn(n,p))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);