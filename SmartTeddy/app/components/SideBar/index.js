import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { Content, Text, List, ListItem, Icon, View } from 'native-base';

import { closeDrawer } from '../../actions/drawer';
import { replaceOrPushRoute } from '../../actions/route';
import sidebarTheme from './sidebar-theme';
import styles from './style';


const drawerImage = require('../../../img/logo.png');

class SideBar extends Component {

    static propTypes = {
        closeDrawer: React.PropTypes.func,
        replaceOrPushRoute: React.PropTypes.func,
        drawerState: React.PropTypes.string  //eslint-disable-line
    };

    constructor(props) {
        super(props);
        this.state = {
            shadowOffsetWidth: 1,
            shadowRadius: 4
        };
    }

    navigateTo(route) {
        this.props.closeDrawer();
        this.props.replaceOrPushRoute(route);
    }

    render() {
        return (
            <Content
                theme={sidebarTheme}
                style={styles.sidebar}
                >
                <View  style={styles.drawerCover}>
                    <Image
                        square
                        style={styles.drawerImage}
                        source={drawerImage}
                        />
                    <Text>Лучший родитель на свете</Text>
                </View>
                <List>
                    <ListItem button iconLeft onPress={() => this.navigateTo('anatomy')} >
                        <View style={styles.listItemContainer}>
                            <View style={[styles.iconContainer, { paddingLeft: 14 }]}>
                                <Icon name="ios-browsers" style={styles.sidebarIcon} />
                            </View>
                            <Text style={styles.text}>Пример tab снизу</Text>
                        </View>
                    </ListItem>
                    <ListItem button iconLeft onPress={() => this.navigateTo('store')} >
                        <View style={styles.listItemContainer}>
                            <View style={[styles.iconContainer, { paddingLeft: 14 }]}>
                                <Icon name="ios-cart" style={styles.sidebarIcon} />
                            </View>
                            <Text style={styles.text}>Магазин сказок</Text>
                        </View>
                    </ListItem>
                    <ListItem button iconLeft onPress={() => this.navigateTo('user-stories')} >
                        <View style={styles.listItemContainer}>
                            <View style={[styles.iconContainer, { paddingLeft: 14 }]}>
                                <Icon name="ios-cart" style={styles.sidebarIcon} />
                            </View>
                            <Text style={styles.text}>Мои сказки</Text>
                        </View>
                    </ListItem>
                    <ListItem button iconLeft onPress={() => this.navigateTo('bears')} >
                        <View style={styles.listItemContainer}>
                            <View style={[styles.iconContainer, { paddingLeft: 14 }]}>
                                <Icon name="ios-paw" style={styles.sidebarIcon} />
                            </View>
                            <Text style={styles.text}>Примедведиться</Text>
                        </View>
                    </ListItem>
                    <ListItem button iconLeft onPress={() => this.navigateTo('profile')} >
                        <View style={styles.listItemContainer}>
                            <View style={[styles.iconContainer, { paddingLeft: 14 }]}>
                                <Icon name="ios-person" style={styles.sidebarIcon} />
                            </View>
                            <Text style={styles.text}>Профиль</Text>
                        </View>
                    </ListItem>
                    <ListItem button iconLeft onPress={() => this.navigateTo('bluetooth')} >
                        <View style={styles.listItemContainer}>
                            <View style={[styles.iconContainer, { paddingLeft: 14 }]}>
                                <Icon name="ios-bluetooth" style={styles.sidebarIcon} />
                            </View>
                            <Text style={styles.text}>Блютус</Text>
                        </View>
                    </ListItem>
                    <ListItem button iconLeft onPress={() => this.navigateTo('alarm')} >
                        <View style={styles.listItemContainer}>
                            <View style={[styles.iconContainer, { paddingLeft: 14 }]}>
                                <Icon name="ios-alarm" style={styles.sidebarIcon} />
                            </View>
                            <Text style={styles.text}>Будильник</Text>
                        </View>
                    </ListItem>
                </List>
            </Content>
        );
    }
}

function bindAction(dispatch) {
    return {
        closeDrawer: () => dispatch(closeDrawer()),
        replaceOrPushRoute: route => dispatch(replaceOrPushRoute(route)),
    };
}

const mapStateToProps = state => ({
    drawerState: state.drawer.drawerState
});

export default connect(mapStateToProps, bindAction)(SideBar);