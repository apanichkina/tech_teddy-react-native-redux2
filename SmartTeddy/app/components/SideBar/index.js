import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { Content, Text, List, ListItem, Icon, View } from 'native-base';

import { closeDrawer } from '../../actions/drawer';
import { replaceOrPushRoute } from '../../actions/route';
import sidebarTheme from './sidebar-theme';
import styles from './style';
const drawerImage = require('../../../img/header.png');

class SideBar extends Component {

    static propTypes = {
        closeDrawer: React.PropTypes.func,
        replaceOrPushRoute: React.PropTypes.func,
        drawerState: React.PropTypes.string,  //eslint-disable-line
        openModal: React.PropTypes.func
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
        const { bearname, isAuth, username } = this.props;
        return (
            <Content
                theme={sidebarTheme}
                style={styles.sidebar}
                >

                <Image
                    style={styles.drawerCover}
                    source={drawerImage}>
                    <View style={styles.backdropView}>
                        <Text style={styles.headline}>{username ? username : 'Лучший в мире родитель'}</Text>
                    </View>
                </Image>
                <List>

                    <ListItem button iconLeft onPress={() => this.navigateTo('home')} >
                        <View style={styles.listItemContainer}>
                            <View style={styles.iconContainer}>
                                <Icon name="ios-cart" style={styles.sidebarIcon} />
                            </View>
                            <Text style={styles.text}>Магазин сказок</Text>
                        </View>
                    </ListItem>
                    {!isAuth ?
                        <ListItem button iconLeft onPress={() => this.navigateTo('signin')} >
                            <View style={styles.listItemContainer}>
                                <View style={styles.iconContainer}>
                                    <Icon name="ios-log-in-outline" style={styles.sidebarIcon} />
                                </View>
                                <Text style={styles.text}>Войти</Text>
                            </View>
                        </ListItem>
                    : null
                    }
                </List>
                {isAuth ?
                    <List>

                        <ListItem button iconLeft onPress={() => this.navigateTo('user-stories')} >
                            <View style={styles.listItemContainer}>
                                <View style={[styles.iconContainer]}>
                                    <Icon name="ios-book" style={styles.sidebarIcon} />
                                </View>
                                <Text style={styles.text}>Мои сказки</Text>
                            </View>
                        </ListItem>
                        <ListItem button iconLeft onPress={() => this.navigateTo('profile')} >
                            <View style={styles.listItemContainer}>
                                <View style={styles.iconContainer}>
                                    <Icon name="ios-person" style={styles.sidebarIcon} />
                                </View>
                                <Text style={styles.text}>Профиль</Text>
                            </View>
                        </ListItem>
                        <ListItem button iconLeft onPress={() => this.navigateTo('bears')} >
                            <View style={styles.listItemContainer}>
                                <View style={styles.iconContainer}>
                                    <Icon name="ios-paw" style={styles.sidebarIcon} />
                                </View>
                                <Text style={styles.text}>{'Примедведиться'}</Text>
                            </View>
                        </ListItem>

                        <ListItem button iconLeft onPress={() => this.props.openModal()} >
                            <View style={styles.listItemContainer}>
                                <View style={styles.iconContainer}>
                                    <Icon name="ios-log-out-outline" style={styles.sidebarIcon} />
                                </View>
                                <Text style={styles.text}>Выйти</Text>
                            </View>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text style={!!bearname ? styles.connectedBear : styles.text} >{bearname || 'Игрушка не подключена'}</Text>
                        </ListItem>

                        <ListItem button disabled={!bearname} iconLeft onPress={() => this.navigateTo('bear-profile')}>
                            <View style={styles.listItemContainer}>
                                <View style={styles.iconContainer}>
                                    <Icon name="ios-book" style={[styles.sidebarIcon, !bearname ? {color:'#BDBDBD'}:null]} />
                                </View>
                                <Text style={[styles.text, !bearname ? {color:'#BDBDBD'}:null]}>Сказки на мишке</Text>
                            </View>
                        </ListItem>
                        <ListItem button disabled={!bearname} iconLeft onPress={() => this.navigateTo('alarm')}>
                            <View style={styles.listItemContainer}>
                                <View style={styles.iconContainer}>
                                    <Icon name="ios-alarm" style={[styles.sidebarIcon, !bearname ? {color:'#BDBDBD'}:null]} />
                                </View>
                                <Text style={[styles.text, !bearname ? {color:'#BDBDBD'}:null]}>Будильник</Text>
                            </View>
                        </ListItem>

                        <ListItem button disabled={!bearname} iconLeft onPress={() => this.navigateTo('wi-fi')}>
                            <View style={styles.listItemContainer}>
                                <View style={styles.iconContainer}>
                                    <Icon name="ios-wifi" style={[styles.sidebarIcon, !bearname ? {color:'#BDBDBD'}:null]} />
                                </View>
                                <Text style={[styles.text, !bearname ? {color:'#BDBDBD'}:null]}>WiFi</Text>
                            </View>
                        </ListItem>

                    </List>
                    : null

                }




            </Content>

        );
    }
}



const mapStateToProps = state => ({
    drawerState: state.drawer.drawerState,
    bearname: state.bear.connectedBearName,
    isAuth: !!state.user.token,
    username: state.user.user
});

const mapDispatchToProps = (dispatch) =>{
    return {
        closeDrawer: () => dispatch(closeDrawer()),
        replaceOrPushRoute: route => dispatch(replaceOrPushRoute(route))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);