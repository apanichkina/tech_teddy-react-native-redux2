
import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Content, Header, Text, Title, Icon, View, Thumbnail, H1 } from 'native-base';
import { fetchCategories } from '../../actions/storyCategory'
import styles from './styles';
import { connect } from 'react-redux';
import myTheme from '../../themes/base-theme';
const splashscreen = require('../../../img/web_hi_res_512.png');

class SplashPage extends Component {

  static propTypes = {
    navigator: React.PropTypes.shape({})
  };

  componentWillMount() {
    const navigator = this.props.navigator;
      Promise.all([this.props.fetchCategories()]).then(values => {
          navigator.replace({
              id: 'home'
          });
      });
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


const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => dispatch(fetchCategories())
    }
};


export default connect(
    null,
    mapDispatchToProps
)(SplashPage)