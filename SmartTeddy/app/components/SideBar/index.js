import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { Content, Text, List, ListItem, Icon, View, Thumbnail, Spinner, Button, Container, Footer } from 'native-base';
import Player from '../StoryProfile/Player'
import { closeDrawer } from '../../actions/drawer';
import { replaceOrPushRoute,pushNewRoute } from '../../actions/route';
import sidebarTheme from './sidebar-theme';
import footerTheme from './footer-theme';
import styles from './style';
import { seeStory } from '../../actions/story';
const drawerImage = require('../../../img/header.png');
const defaultImage = require('../../../img/no-image-slide.png');
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
    onClick(id, isRoled) {
        this.props.onStoryClick(id);
        this.props.closeDrawer();
        if ( isRoled ) {
            this.props.pushNewRoute('interactive')
        } else {
            this.props.pushNewRoute('story-profile')
        }

        //this.navigateTo('story-profile')
    }
    render() {
        const { bearname, isAuth, username, storyId, story, subId } = this.props;
        return (
            <Container>
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
                                <Icon name="ios-albums" style={styles.sidebarIcon} />
                            </View>
                            <Text style={styles.text}>Каталог сказок</Text>
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


                        <ListItem button iconLeft onPress={() => this.navigateTo('bears')} >
                            <View style={styles.listItemContainer}>
                                <View style={styles.iconContainer}>
                                    <Icon name="ios-search" style={styles.sidebarIcon} />
                                </View>
                                <Text style={styles.text}>{'Поиск устройств'}</Text>
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
                        {/*<ListItem button style={{backgroundColor: '#BDBDBD', padding:0, margin:0}} onPress={() => console.log('wi-fi')}>
                         <Thumbnail square size={50}  source={{uri: 'https://storage.googleapis.com/hardteddy_images/small/2.jpg'}} />
                         <View style={{flexDirection: 'row'}}>
                         <View>
                         <Text style={{color: '#212121'}}>Музыка</Text>
                         <Text note>Категория</Text>
                         </View>
                         <Player storyId={2}/>
                         </View>
                         </ListItem>
                        */}

                    </List>
                    : null
                }
            </Content>
                { isAuth && !!bearname && story && storyId != -1 &&
                    <Footer theme={footerTheme} style={{ elevation: 3}}>
                        <ListItem button style={{backgroundColor: '#BDBDBD', paddingLeft:0, marginLeft:0, paddingTop:2, marginTop:0, paddingRight:5}} onPress={() => this.onClick(story.id, story.roled)}>
                            <Thumbnail square size={55}  source={{uri: story.img_urls.small}} />
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Text style={{color: '#212121'}}>{story.name.toUpperCase()}</Text>
                                    {story.roled &&
                                    <Text note>{story.story_parts[subId].title}</Text>
                                    }
                                </View>
                                <View style={{width:60}}>
                                <Player storyId={storyId}/>
                                </View>
                            </View>
                        </ListItem>
                    </Footer>
                }

            </Container>
        );
    }
}

const mapStateToProps = state => ({
    drawerState: state.drawer.drawerState,
    bearname: state.bear.connectedBearName,
    isAuth: !!state.user.token,
    username: state.user.user,
    storyId: state.player.storyId,
    story: state.userStories.stories[parseInt(state.player.storyId)],
    subId: parseInt(state.player.storyId.toString().split("_")[1])-1
    //story: state.userStories.stories[parseInt(state.player.storyId.toString().split("_")[0])] //Берем название сказки, которая может быть интерактивной
});

const mapDispatchToProps = (dispatch) =>{
    return {
        closeDrawer: () => dispatch(closeDrawer()),
        replaceOrPushRoute: route => dispatch(replaceOrPushRoute(route)),
        onStoryClick: id => dispatch(seeStory(id)),
        pushNewRoute: route => dispatch(pushNewRoute(route))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);