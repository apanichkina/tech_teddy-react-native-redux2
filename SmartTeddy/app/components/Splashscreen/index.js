
import React, { Component } from 'react';
import { Image, View as D } from 'react-native';
import { Container, Content, Header, Text, Title, Icon, View, Thumbnail, H1 } from 'native-base';
const splashscreen = require('../../../img/web_hi_res_512.png');
import styles from './styles';
import myTheme from '../../themes/base-theme';
export default class SplashPage extends Component {

  static propTypes = {
    navigator: React.PropTypes.shape({})
  }

  componentWillMount() {
    const navigator = this.props.navigator;
    setTimeout(() => {
      navigator.replace({
        id: 'home'
      });
    }, 500);
  }

  render() { // eslint-disable-line class-methods-use-this
    return (
    <Container theme={myTheme} style={{backgroundColor: '#ffffff'}}>
            <View style={styles.logoContainer}>
                <Thumbnail source={splashscreen} style={styles.logo} />
                {/*
                 <View style={styles.text}>
                 <H1>Magic</H1>
                 <H1 style={{paddingLeft:30}}>BACKPACK</H1>
                 </View>
                */}

            </View>


    </Container>

    );
  }
}
