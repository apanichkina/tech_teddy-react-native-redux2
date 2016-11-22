import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Text, List, ListItem, Card, CardItem, Radio, Button, Icon } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import { pushNewRoute, replaceRoute} from '../../actions/route';
import { searchBears, connectToDevice } from '../../actions/bluetooth';
import { setConnectedBearName, setBearStories } from '../../actions/bear';

import styles from './styles';
import myTheme from '../../themes/base-theme';
class Bears extends Component {

    static propTypes = {
        openDrawer: React.PropTypes.func,
        pushNewRoute: React.PropTypes.func,
        searchBears: React.PropTypes.func,
        setConnectedBearName: React.PropTypes.func,
        connectToDevice: React.PropTypes.func,
        setBearStories: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        this.props.searchBears();
    }
    onBearClick(name, id) {
        this.props.connectToDevice(id, name)
            .then(() => {
                this.props.replaceRoute('bear-profile');
            })
            .catch((err) => console.log('connectToDevice ERROR', err))
        // this.props.setConnectedBearName(name);
        // this.props.pushNewRoute('bear-profile');
    }

    render() {
        const {bears, searchBears, bluetoothEnabled, devicesCount} = this.props;
        console.log('dddddd')
        console.log(bears);
        console.log(devicesCount);
        return (
            <Container theme={myTheme} style={styles.container}>

                <Header>
                    <Button transparent onPress={this.props.openDrawer}>
                        <Icon name="ios-menu" />
                    </Button>
                    <Title>Примедведиться</Title>
                </Header>
                <Content>
                    {!bluetoothEnabled ?
                        <Text>Блютус не подключен</Text>
                        : (!devicesCount) ?
                        <Text>Нет соединенных устройств</Text>
                        :<List dataArray={bears}
                                renderRow={(item) =>
                                <ListItem button onPress={()=>{this.onBearClick(item.name, item.id)}}>
                                    <Content>
                                        <Text style={styles.header} >{item.name}</Text>
                                        <Text style={styles.help} >{item.id}</Text>
                                    </Content>
                                </ListItem>
                            }>
                    </List>

                    }

                    {/* <Button style={styles.btn_search} onPress={searchBears}>
                        <Icon name='ios-search' />
                        Найти
                    </Button> */}
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        bears: state.bluetooth.searchBears,
        devicesCount: Object.keys(state.bluetooth.searchBears).length,
        bluetoothEnabled: state.bluetooth.bluetoothEnabled
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        replaceRoute: (route) => dispatch(replaceRoute(route)),
        openDrawer: () => dispatch(openDrawer()),
        pushNewRoute: route => dispatch(pushNewRoute(route)),
        setConnectedBearName: name => dispatch(setConnectedBearName(name)),
        searchBears: () => dispatch(searchBears()),
        connectToDevice: (id, name) => dispatch(connectToDevice(id, name)),
        setBearStories: () => dispatch(setBearStories())
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bears)