import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Text, List, ListItem, Button, Icon, InputGroup, Input, View} from 'native-base';
import {MKProgress} from 'react-native-material-kit';
import {setErrorVisible} from '../../actions/error'
import { openDrawer, closeDrawer } from '../../actions/drawer';
import styles from './styles';
import myTheme from '../../themes/base-theme';
class Profile extends Component {

    static propTypes = {
        openDrawer: React.PropTypes.func,
        closeDrawer: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            progress: 0
        }
    }
    render() {
        const { bluetoothEnabled } = this.props;
        setTimeout((function() {
            this.setState({ progress: this.state.progress + (0.4 * Math.random())});
        }).bind(this), 1000);

        return (
            <Container theme={myTheme} style={styles.container}>

                <Header>
                    <Button transparent onPress={this.props.openDrawer}>
                        <Icon name="ios-menu" />
                    </Button>
                    <Title>Профиль</Title>
                </Header>

                <Content padder>
                    <Text>{bluetoothEnabled ? 'Bluetooth is enabled' : 'Bluetooth is disabled'}</Text>
                    <Text style={{ color: '#00C497' }} >Залогинен</Text>
                    <Text style={{  paddingTop: 5}} >Возраст ребенка</Text>
                    <InputGroup>
                        <Input maxLength={2} keyboardType='numeric' placeholder='Например: 2' />
                    </InputGroup>
                    <Button onPress={this.props.setErrorVisible}> Error</Button>
                    <MKProgress
                        style={styles.progress}
                        progress={this.state.progress}
                        />
                </Content>
            </Container>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        bluetoothEnabled: state.bluetooth.bluetoothEnabled
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        openDrawer: () => dispatch(openDrawer()),
        closeDrawer: () => dispatch(closeDrawer()),
        setErrorVisible: () => dispatch(setErrorVisible())

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);