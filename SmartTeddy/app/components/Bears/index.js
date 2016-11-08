import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Text, List, ListItem, Card, CardItem, Radio, Button, Icon } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import { pushNewRoute } from '../../actions/route';
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
    }
    onBearClick(name, id) {
        this.props.connectToDevice(id);
        this.props.setConnectedBearName(name);
        this.props.pushNewRoute('bear-profile');
    }

    render() {
        const {bears, searchBears} = this.props;
        return (
            <Container theme={myTheme} style={styles.container}>

                <Header>
                    <Button transparent onPress={this.props.openDrawer}>
                        <Icon name="ios-menu" />
                    </Button>
                    <Title>Примедведиться</Title>
                    <Button transparent right onPress={this.props.setBearStories}>
                        <Icon name="ios-menu" />
                    </Button>
                </Header>
                <Content>
                <List dataArray={bears}
                      renderRow={(item) =>
                            <ListItem button onPress={()=>{this.onBearClick(item.name, item.id)}}>
                             <Text>id: {item.id}</Text>
                                <Text>{item.name}</Text>
                            </ListItem>
                        }>
                </List>
                    <Button style={styles.btn_search} onPress={searchBears}>
                        <Icon name='ios-search' />
                        Найти
                    </Button>
                    </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        bears: state.bluetooth.searchBears
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        openDrawer: () => dispatch(openDrawer()),
        pushNewRoute: route => dispatch(pushNewRoute(route)),
        setConnectedBearName: name => dispatch(setConnectedBearName(name)),
        searchBears: () => dispatch(searchBears()),
        connectToDevice: (id) => dispatch(connectToDevice(id)),
        setBearStories: () => dispatch(setBearStories())
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bears)