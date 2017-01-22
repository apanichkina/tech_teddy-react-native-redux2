
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { Container, Header, Title, Content, Button, Icon, Card, CardItem, Text, Thumbnail, View } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { openDrawer } from '../../actions/drawer';
import { popRoute, pushNewRoute } from '../../actions/route';
import { buyStory } from '../../actions/store';
import { seeSubStory } from '../../actions/subStory'
import { uploadStoryToBear, deleteStoryFromBear} from '../../actions/bearStory';
import { playStoryOnBear, pauseStoryOnBear } from '../../actions/player';
import { fetchBuyStory } from '../../actions/store';
import StoryCard from './storyCard'
import styles from './styles';
import myTheme from '../../themes/base-theme';
var Slider = require('react-native-slider');

const logo_fun = 'ios-happy-outline';
const logo_edu = 'ios-school-outline';
const logo_night = 'ios-moon-outline';
const logo_helper = 'ios-ionitron-outline';
const logo_default = 'ios-book-outline';


class SProfile extends Component {
    static propTypes = {
        popRoute: React.PropTypes.func,
        pushNewRoute: React.PropTypes.func,
        openDrawer: React.PropTypes.func
    };

    popRoute() {
        this.props.popRoute();
    }
    connectBear() {
        this.props.pushNewRoute('bears')
    }
    buyStory(id) {
        if (this.props.isAuth) this.props.buyStory(id);
        else this.props.pushNewRoute('signin')
    }
    goToInteractive(id){
       // this.props.seeSubStory(id);
        this.props.pushNewRoute('interactive')
    }


  render() {
    const { story, isBought, category, isUpload, isConnected, downloaded, isDownloading} = this.props;
      let logo = '';
      switch(category.toLowerCase()) {
          case "сказки":
              logo = logo_fun;
              break;
          case "на ночь":
              logo = logo_night;
              break;
          case "помощь":
              logo = logo_helper;
              break;
          default:
              logo = logo_default;
              break;
      }
    return (
      <Container theme={myTheme} style={styles.container}>
        <Header>
          <Title>Сказка</Title>

          <Button transparent onPress={()=>this.popRoute()}>
            <Icon name="md-arrow-back" />
          </Button>
        </Header>

        <Content padder>
            <StoryCard
                {...story}
                onBuyClick={()=>{this.buyStory(story.id)}}
                onConnectBear={()=>{this.connectBear()}}
                isUpload={isUpload}
                isConnected={isConnected}
                isBought={isBought}
                logo={logo}
                category={category}
                downloaded={downloaded}
                isDownloading={isDownloading}
                goToInteractive={()=>{this.goToInteractive(story.story_parts[0].id)}}
                />

        </Content>
      </Container>
    );
  }
}


const findElementById = (array, value) => {
    let result = array.filter(obj => obj.id == value);
    return !!result.length;
};

const getStoryFromResource = (storeStories, userStories, id) => {
    if (storeStories.length) return storeStories[id];
    else return userStories[id];
};

const mapStateToProps = (state) => {
  return {
      story: getStoryFromResource(state.storeStories.stories, state.userStories.stories, state.story.storyId),
      isBought: !!state.userStories.stories[state.story.storyId],
      isUpload: findElementById(state.bear.bearStories, state.story.storyId),
      category: state.storyCategory.categoryFilter,
      isConnected: !!state.bluetooth.bluetoothConnected,
      downloaded: state.bearStory.downloaded,
      isDownloading: (state.story.storyId == state.bearStory.downloadingStoryId),
      isAuth: !!state.user.token
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      buyStory: id => dispatch(fetchBuyStory(id)),
      openDrawer: () => dispatch(openDrawer()),
      popRoute: () => dispatch(popRoute()),
      pushNewRoute: route => dispatch(pushNewRoute(route)),
      seeSubStory: id => dispatch(seeSubStory(id))
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SProfile)