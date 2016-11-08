import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Text, H3, Button, Icon, Footer, FooterTab } from 'native-base';

import { openDrawer, closeDrawer } from '../../actions/drawer';
import { replaceRoute, replaceOrPushRoute } from '../../actions/route';
import myTheme from '../../themes/base-theme';
import styles from './styles';

class Anatomy extends Component {

    static propTypes = {
        openDrawer: React.PropTypes.func,
        closeDrawer: React.PropTypes.func,
        replaceRoute: React.PropTypes.func,
        replaceOrPushRoute: React.PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            tab1: false,
            tab2: false,
            tab3: true,
            tab4: false
        };
    }
    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    toggleTab1() {
        this.setState({
            tab1: true,
            tab2: false,
            tab3: false,
            tab4: false
        });
    }

    toggleTab2() {
        this.setState({
            tab1: false,
            tab2: true,
            tab3: false,
            tab4: false
        });
    }

    toggleTab3() {
        this.setState({
            tab1: false,
            tab2: false,
            tab3: true,
            tab4: false
        });
    }

    toggleTab4() {
        this.setState({
            tab1: false,
            tab2: false,
            tab3: false,
            tab4: true
        });
    }
    navigateTo(route) {
        this.props.closeDrawer();
        this.props.replaceOrPushRoute(route);
    }

    render() {
        return (
            <Container theme={myTheme} style={styles.container}>

                <Header>
                    <Button transparent onPress={this.props.openDrawer}>
                        <Icon name="ios-menu" />
                    </Button>
                    <Title>Anatomy</Title>
                </Header>

                <Content padder>
                    <H3>This is content section</H3>
                    <Text style={{marginTop: 10}}>Selected tab is: {this.state.tab1 ? 1 : this.state.tab2 ? 2 : this.state.tab3 ? 3 : 4}</Text>
                    <H3>This is content section</H3>
                    <H3>This is content section</H3>
                    <H3>This is content section</H3>
                    <H3>This is content section</H3>
                    <H3>This is content section</H3>
                    <H3>This is content section</H3>
                    <H3>This is content section</H3>
                    <H3>This is content section</H3>
                    <H3>This is content section</H3>
                    <H3>This is content section</H3>
                    <H3>This is content section</H3>
                    <H3>This is content section</H3>
                    <H3>This is content section</H3>
                    <H3>This is content section</H3>
                    <H3>This is content section</H3>
                    <H3>This is content section</H3>
                    <H3>This is content section</H3>
                    <H3>This is content section</H3>
                    <H3>This is content section</H3>
                    <H3>This is content section</H3>
                    <H3>This is content section</H3>
                    <H3>This is content section</H3>
                    <H3>This is content section</H3>
                    <H3>This is content section</H3>
                    <H3>This is content section</H3>






                </Content>

                <Footer >
                    <FooterTab>
                        <Button active={this.state.tab1} onPress={() => this.toggleTab1()} >
                            Apps
                            <Icon name="ios-apps-outline" />
                        </Button>
                        <Button active={this.state.tab2} onPress={() => this.toggleTab2()} >
                            Camera
                            <Icon name="ios-camera-outline" />
                        </Button>
                        <Button active={this.state.tab3} onPress={() => this.toggleTab3()} >
                            Navigate
                            <Icon name="ios-compass" />
                        </Button>
                        <Button active={this.state.tab4} onPress={() => this.toggleTab4()} >
                            Contact
                            <Icon name="ios-contact-outline" />
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: () => dispatch(openDrawer()),
        closeDrawer: () => dispatch(closeDrawer()),
        replaceRoute: route => dispatch(replaceRoute(route)),
        replaceOrPushRoute: route => dispatch(replaceOrPushRoute(route))
    };
}

export default connect(null, bindAction)(Anatomy);
