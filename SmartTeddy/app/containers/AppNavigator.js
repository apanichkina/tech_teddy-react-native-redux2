
import React, { Component } from 'react';
import { BackAndroid, Platform, StatusBar, Navigator } from 'react-native';
import { connect } from 'react-redux';
import { Drawer } from 'native-base';

import { closeDrawer } from '../actions/drawer';
import { popRoute } from '../actions/route';

import Home from '../components/Home';
import Anatomy from '../components/Anatomy/';
import Store from './Store';
import UserStories from './UserStories';
import Counter from '../components/counter';
import Bears from '../components/Bears/';
import Profile from '../components/Profile/';
import BearProfile from '../components/BearProfile/';
import StoryProfile from '../components/StoryProfile';
import SideBar from '../components/SideBar/';
import Alarm from './ClockAlarm'
import WiFi from './WiFi'
import Bluetooth from './Bluetooth'
import BStory from './Story'
import { enableBluetooth, disableBluetooth } from '../actions/bluetooth';
import BluetoothSerial from 'react-native-bluetooth-hc05'
//import statusBarColor from './themes/base-theme';

Navigator.prototype.replaceWithAnimation = function replaceWithAnimation(route) {
    const activeLength = this.state.presentedIndex + 1;
    const activeStack = this.state.routeStack.slice(0, activeLength);
    const activeAnimationConfigStack = this.state.sceneConfigStack.slice(0, activeLength);
    const nextStack = activeStack.concat([route]);
    const destIndex = nextStack.length - 1;
    const nextSceneConfig = this.props.configureScene(route, nextStack);
    const nextAnimationConfigStack = activeAnimationConfigStack.concat([nextSceneConfig]);

    const replacedStack = activeStack.slice(0, activeLength - 1).concat([route]);
    this._emitWillFocus(nextStack[destIndex]);
    this.setState({
        routeStack: nextStack,
        sceneConfigStack: nextAnimationConfigStack
    }, () => {
        this._enableScene(destIndex);
        this._transitionTo(destIndex, nextSceneConfig.defaultTransitionVelocity, null, () => {
            this.immediatelyResetRouteStack(replacedStack);
        });
    });
};

export const globalNav = {};

class AppNavigator extends Component {

    static propTypes = {
        drawerState: React.PropTypes.string,
        popRoute: React.PropTypes.func,
        closeDrawer: React.PropTypes.func,
        connectBluetooth: React.PropTypes.func,
        unconnectBluetooth: React.PropTypes.func
    }
    componentWillMount() {
            BluetoothSerial.isEnabled().then((value) => {
                if (value)  {
                    this.enableBluetooth();
                }
            }).catch(error => {
                console.log(error);
            });
    }
    componentDidMount() {
        globalNav.navigator = this._navigator;

        BackAndroid.addEventListener('hardwareBackPress', () => {
            const routes = this._navigator.getCurrentRoutes();

            if (routes[routes.length - 1].id === 'home') {
                // CLose the app
                return true;
            }
            this.popRoute();
            return true;
        });

        BluetoothSerial.on('bluetoothEnabled', () => {
            this.enableBluetooth();
            console.log('Bluetooth enabled')
        });

        BluetoothSerial.on('bluetoothDisabled', () => {
            this.disableBluetooth();
            console.log('Bluetooth disabled')
        })
    }

    componentDidUpdate() {
        if (this.props.drawerState === 'opened') {
            this.openDrawer();
        }

        if (this.props.drawerState === 'closed') {
            this._drawer.close();
        }
    }

    popRoute() {
        this.props.popRoute();
    }
    enableBluetooth() {
        this.props.enableBluetooth();
    }
    disableBluetooth() {
        this.props.disableBluetooth();
    }

    openDrawer() {
        this._drawer.open();
    }

    closeDrawer() {
        if (this.props.drawerState === 'opened') {
            this._drawer.close();
            this.props.closeDrawer();
        }
    }

    renderScene(route, navigator) { // eslint-disable-line class-methods-use-this
        switch (route.id) {
            case 'home':
                return <Home navigator={navigator} />;
            case 'anatomy':
                return <Anatomy navigator={navigator} />;
            case 'store':
                return <Store navigator={navigator} />;
            case 'user-stories':
                return <UserStories navigator={navigator} />;
            case 'counter':
                return <Counter navigator={navigator} />;
            case 'bears':
                return <Bears navigator={navigator} />;
            case 'story-profile':
                return <StoryProfile navigator={navigator} />;
            case 'profile':
                return <Profile navigator={navigator} />;
            case 'bear-profile':
                return <BearProfile navigator={navigator} />;
            case 'bluetooth':
                return <Bluetooth navigator={navigator} />;
            case 'bluetooth-story':
                return <BStory navigator={navigator} />;
            case 'alarm':
                return <Alarm navigator={navigator} />;
            case 'wi-fi':
                return <WiFi navigator={navigator} />;
            default :
                return <Home navigator={navigator} />;
        }
    }

    render() {
        return (
            <Drawer
                ref={(ref) => { this._drawer = ref; }}
                type="overlay"
                tweenDuration={150}
                content={<SideBar navigator={this._navigator} />}
                tapToClose
                acceptPan={false}
                onClose={() => this.closeDrawer()}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                styles={{
          drawer: {
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 3
          }
        }}
                tweenHandler={(ratio) => {
          return {
            drawer: { shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5 },
            main: {
              opacity: (2 - ratio) / 2
            }
          };
        }}
                negotiatePan
                >
                <StatusBar
                    barStyle="default"
                    />
                <Navigator
                    ref={(ref) => {
            this._navigator = ref;
          }}
                    configureScene={() => Navigator.SceneConfigs.FloatFromRight}
                    initialRoute={{ id: (Platform.OS === 'android') ? 'splashscreen' : 'home', statusBarHidden: true }}
                    renderScene={this.renderScene}
                    />
            </Drawer>
        );
    }
}

const bindAction = dispatch => ({
    closeDrawer: () => dispatch(closeDrawer()),
    popRoute: () => dispatch(popRoute()),
    enableBluetooth: () => dispatch(enableBluetooth()),
    disableBluetooth: () => dispatch(disableBluetooth())
});

const mapStateToProps = state => ({
    drawerState: state.drawer.drawerState
});

export default connect(mapStateToProps, bindAction)(AppNavigator);